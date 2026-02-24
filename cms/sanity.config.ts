import { buildLegacyTheme, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';

import structure from './lib/structure';
import schemas from './schemas';
import './custom.css';

const greenTheme = buildLegacyTheme({
  '--black': '#1a2e1a',
  '--white': '#e8f5e9',

  '--gray': '#4a7c59',
  '--gray-base': '#4a7c59',

  '--component-bg': '#e8f5e9',
  '--component-text-color': '#1a2e1a',

  '--brand-primary': '#2e7d32',

  '--default-button-color': '#4a7c59',
  '--default-button-primary-color': '#2e7d32',
  '--default-button-success-color': '#43a047',
  '--default-button-warning-color': '#f9a825',
  '--default-button-danger-color': '#c62828',

  '--state-info-color': '#388e3c',
  '--state-success-color': '#43a047',
  '--state-warning-color': '#f9a825',
  '--state-danger-color': '#c62828',

  '--main-navigation-color': '#1b5e20',
  '--main-navigation-color--inverted': '#e8f5e9',

  '--focus-color': '#66bb6a',
});

export default defineConfig({
  name: 'default',
  title: 'sanity-in-practice-demo',

  projectId: 'f59o0jjn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemas,
  },

  theme: greenTheme,
});
