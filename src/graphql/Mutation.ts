import { Artist } from '@prisma/client';
import { intArg, mutationType, stringArg } from 'nexus';
import { ARTIST_UPDATE } from '../constants';
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
            select: {
              Album: true,
              ArtistId: true,
              Name: true,
            },
          });
          pubsub.publish(ARTIST_UPDATE, updatedArtist);
          return true;
        } catch (err) {
          console.error(err);
          return err;
        }
      },
    });
  },
});
