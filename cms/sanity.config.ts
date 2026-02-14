import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import schemas from './schemas';

export default defineConfig({
  name: 'default',
  title: 'sanity-in-practice',

  projectId: 'xyk2gm36',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
});
