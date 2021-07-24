import { queryType } from 'nexus';
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
            select: {
              Album: true,
              ArtistId: true,
              Name: true,
            },
          });
          return artists;
        } catch (err) {
          console.error(err);
          return err;
        }
      },
    });
  },
});
