import { objectType } from 'nexus';

export const AlbumType = objectType({
  name: 'Album',
  definition(t) {
    t.string('Title');
    t.string('ArtistId');
    t.field('Artist', {
      type: ArtistType,
    });
  },
});

export const ArtistType = objectType({
  name: 'Artist',
  definition(t) {
    t.string('Name');
    t.string('ArtistId');
    t.list.field('Albums', {
      type: AlbumType,
    });
  },
});
