import { Artist } from '@prisma/client';
import { intArg, mutationType, stringArg } from 'nexus';
import { ARTIST_UPDATE, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants';
import { IContext } from '../interfaces';
import { pubsub } from './pubsub';

export const Mutation = mutationType({
  definition(t) {
    t.field('updateArtist', {
      type: 'Boolean',
      args: {
        Name: stringArg(),
        ArtistId: intArg(),
      },
      resolve: async (_, { ArtistId, Name }: Artist, ctx: IContext) => {
        try {
          const updatedArtist = await ctx.prisma.artist.update({
            data: { Name },
            where: { ArtistId },
            include: {
              Albums: true,
            },
          });
          pubsub.publish(ARTIST_UPDATE, updatedArtist);
          return true;
        } catch (err: any) {
          console.error(err);
          if (err.code === 'P2025') {
            return new Error(NOT_FOUND);
          }
          return new Error(INTERNAL_SERVER_ERROR);
        }
      },
    });
  },
});
