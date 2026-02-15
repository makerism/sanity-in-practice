import * as Sanity from '../../www/lib/sanity/types';

import { faker } from '@faker-js/faker';

export type MockDoc<T> = Omit<T, '_createdAt' | '_updatedAt' | '_rev'>;

export const makeKey = (): string => faker.string.alphanumeric(12);

export const uuid = (): string => crypto.randomUUID();

export const random = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const slugify = (text: string): Sanity.Slug => ({
  _type: 'slug',
  current: text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
});

export const imageRef = (assetId: string) => ({
  _type: 'image' as const,
  asset: { _type: 'reference' as const, _ref: assetId },
});

export const richImageRef = (
  assetId: string,
  caption?: string,
): Sanity.RichImage & { _key: string } => ({
  _type: 'richImage',
  _key: makeKey(),
  asset: { _type: 'reference', _ref: assetId },
  ...(caption ? { caption } : {}),
});

export const makeMetadata = (description: string, keywords: string[]): Sanity.Metadata => ({
  _type: 'metadata',
  description,
  keywords,
});

export const makeBlock = (text: string, style: 'normal' | 'h2' | 'h3' | 'h4' = 'normal') => ({
  _type: 'block' as const,
  _key: makeKey(),
  style,
  markDefs: [],
  children: [
    {
      _type: 'span' as const,
      _key: makeKey(),
      text,
      marks: [],
    },
  ],
});

export const makeLinkWithLabel = (label: string, href: string): Sanity.LinkWithLabel => ({
  _type: 'linkWithLabel',
  label,
  href,
  openInNewTab: false,
});
