import * as Sanity from '@sanity/client';
import * as Fs from 'node:fs';
import * as Path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as Person from './mock/person';
import * as Tag from './mock/tag';
import * as EventCategory from './mock/event-category';
import * as Announcement from './mock/announcement';
import * as Article from './mock/article';
import * as Event from './mock/event';
import * as Page from './mock/page';
import * as Settings from './mock/settings';

/*
To generate a new token, run:
pnpm sanity tokens add

When prompted, select the role: "editor"

Then add SANITY_API_TOKEN to your .env.local file.
*/
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
if (!SANITY_API_TOKEN) {
  console.error('Missing SANITY_TOKEN environment variable.');
  console.error('Usage: SANITY_TOKEN=sk-... pnpm seed');
  process.exit(1);
}

const client = Sanity.createClient({
  projectId: 'xyk2gm36',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: SANITY_API_TOKEN,
});

const COUNTS = {
  person: 5,
  tag: 8,
  eventCategory: 5,
  announcement: 3,
  article: 6,
  event: 8,
  page: 3,
};

const range = (count: number) => Array.from({ length: count }, (_, i) => i);

const uploadImages = async () => {
  const imagesDir = Path.join(Path.dirname(fileURLToPath(import.meta.url)), 'mock', 'images');

  if (!Fs.existsSync(imagesDir)) {
    console.warn('No mock/images directory found. Skipping image upload.');
    return [];
  }

  const files = Fs.readdirSync(imagesDir).filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));

  if (files.length === 0) {
    console.warn('No images found in mock/images/. Skipping image upload.');
    return [];
  }

  console.log(`Uploading ${files.length} images...`);
  const assets: { filename: string; assetId: string }[] = [];

  for (const file of files) {
    const filePath = Path.join(imagesDir, file);
    const asset = await client.assets.upload('image', Fs.createReadStream(filePath), {
      filename: file,
    });
    assets.push({ filename: file, assetId: asset._id });
    console.log(`  ✓ ${file} → ${asset._id}`);
  }

  return assets;
};

const pickAssetId = (assets: { assetId: string }[], index: number) => {
  if (assets.length === 0) return 'image-placeholder';
  return assets[index % assets.length].assetId;
};

const seed = async () => {
  // 1. Upload images
  const assets = await uploadImages();
  const assetIds = assets.map((a) => a.assetId);

  // 2. Generate independent documents
  const persons = range(COUNTS.person).map(() => Person.mock());

  const tags = Tag.NAMES.map((title) => Tag.mock({ title }));

  const categories = EventCategory.NAMES.map((title) => EventCategory.mock({ title }));
  const categoryIds = categories.map((c) => c._id);

  const announcements = range(COUNTS.announcement).map(() => Announcement.mock());

  // 3. Generate documents with references
  const articles = range(COUNTS.article).map((i) =>
    Article.mock({
      coverImageAssetId: pickAssetId(assets, i),
      inlineImageAssetIds: [pickAssetId(assets, i + 10), pickAssetId(assets, i + 20)],
    }),
  );

  const events = range(COUNTS.event).map((i) =>
    Event.mock({
      coverImageAssetId: pickAssetId(assets, i + 5),
      categoryIds,
    }),
  );

  const pages = range(COUNTS.page).map((i) =>
    Page.mock({
      pageIndex: i,
      imageAssetIds: assetIds,
    }),
  );

  const settings = Settings.mock({
    announcementId: announcements[0]._id,
    faviconAssetId: assets.length > 0 ? assets[0].assetId : undefined,
  });

  // 4. Build transaction
  const allDocuments = [
    ...persons,
    ...tags,
    ...categories,
    ...announcements,
    ...articles,
    ...events,
    ...pages,
    settings,
  ];

  console.log(`\nCreating ${allDocuments.length} documents...`);
  const transaction = client.transaction();
  for (const doc of allDocuments) {
    transaction.createOrReplace(doc as any);
  }

  await transaction.commit();

  // 5. Summary
  console.log('\nSeed complete!');
  console.log(`  People:           ${persons.length}`);
  console.log(`  Tags:             ${tags.length}`);
  console.log(`  Event Categories: ${categories.length}`);
  console.log(`  Announcements:    ${announcements.length}`);
  console.log(`  Articles:         ${articles.length}`);
  console.log(`  Events:           ${events.length}`);
  console.log(`  Pages:            ${pages.length}`);
  console.log(`  Settings:         1`);
  console.log(`  Total:            ${allDocuments.length}`);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
