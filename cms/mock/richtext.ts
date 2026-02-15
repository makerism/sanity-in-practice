import * as Sanity from '../sanity.types';
import * as Utils from './utils';

import { faker } from '@faker-js/faker';

export const Base = {
  mock: (text: string): Sanity.RichTextBase => [
    { ...Utils.makeBlock(text, 'normal'), markDefs: null, style: 'normal' },
  ],
};

export const Simple = {
  mock: (paragraphs: string[]): Sanity.RichTextSimple =>
    paragraphs.map((p) => ({ ...Utils.makeBlock(p, 'normal'), style: 'normal' as const })),
};

export const WithImages = {
  mock: (
    sections: { heading?: string; text: string }[],
    imageAssetIds: string[],
  ): Sanity.RichTextWithImages =>
    sections.flatMap((section, i) => [
      ...(section.heading ? [Utils.makeBlock(section.heading, 'h2')] : []),
      Utils.makeBlock(section.text),
      ...(i < imageAssetIds.length
        ? [Utils.richImageRef(imageAssetIds[i], faker.lorem.sentence())]
        : []),
    ]),
};
