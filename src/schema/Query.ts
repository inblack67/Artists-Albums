import { queryType } from 'nexus';
import { INTERNAL_SERVER_ERROR } from '../constants';
import { IContext } from '../interfaces';
import { ArtistType } from './types';

export const Query = queryType({
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => 'worlds',
    });
    t.list.field('artists', {
      type: ArtistType,
      resolve: async (_, __, ctx: IContext) => {
        try {
          const artists = await ctx.prisma.artist.findMany({
            include: {
              Albums: true,
            },
          });
          return artists;
        } catch (err) {
          console.error(err);
          return new Error(INTERNAL_SERVER_ERROR);
        }
      },
    });
  },
});
