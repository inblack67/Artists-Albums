import { Artist } from '@prisma/client';
import { stringArg, subscriptionType } from 'nexus';
import { ARTIST_UPDATE } from '../constants';
import { IContext } from '../interfaces';
import { ArtistType } from './types';

export const Subscription = subscriptionType({
  definition(t) {
    t.field('artistChanges', {
      type: ArtistType,
      args: {
        ArtistId: stringArg(),
      },
      subscribe: (_, __, ctx: IContext) => {
        return ctx.pubsub.asyncIterator(ARTIST_UPDATE);
      },
      resolve: (pubsubPayload: Artist) => pubsubPayload,
    });
  },
});
