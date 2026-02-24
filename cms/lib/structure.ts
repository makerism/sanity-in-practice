import * as SanityStructure from 'sanity/structure';
import * as Icons from './icons';

const structure: SanityStructure.StructureResolver = (S) => {
  return S.list()
    .title('Content')
    .items([
      /*
      This is the singleton document for the site settings.
      Only one instance of this document can exist.
      Its ID is 'settings'.
      */
      S.listItem()
        .title('Settings')
        .icon(Icons.Settings)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.listItem()
        .title('Announcements')
        .icon(Icons.Announcement)
        .child(S.documentTypeList('announcement')),

      S.listItem().title('Articles').icon(Icons.Article).child(S.documentTypeList('article')),

      S.listItem().title('Pages').icon(Icons.Page).child(S.documentTypeList('page')),

      S.listItem().title('People').icon(Icons.Person).child(S.documentTypeList('person')),

      // S.listItem().title('Tags').icon(Icons.Tag).child(S.documentTypeList('tag')),

      S.divider(),

      S.listItem().title('Events').icon(Icons.Event).child(S.documentTypeList('event')),

      S.listItem()
        .title('Event Categories')
        .icon(Icons.EventCategory)
        .child(S.documentTypeList('eventCategory')),
    ]);
};

export default structure;
