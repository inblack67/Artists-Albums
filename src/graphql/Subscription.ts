import { Artist } from '@prisma/client';
import { subscriptionType } from 'nexus';
import { ARTIST_UPDATE } from '../constants';
import { pubsub } from './pubsub';
import { ArtistType } from './types';

export const Subscription = subscriptionType({
  definition(t) {
    t.boolean('truths', {
      subscribe() {
        return (async function* () {
          while (true) {
            await new Promise((res) => setTimeout(res, 1000));
            yield Math.random() > 0.5;
          }
        })();
      },
      resolve(eventData) {
        return eventData;
      },
    }),
      t.field('artistChanges', {
        type: ArtistType,
        subscribe: () => {
          return pubsub.asyncIterator(ARTIST_UPDATE);
        },
        resolve: (pubsubPayload: Artist) => {
          return pubsubPayload;
        },
      });
  },
});
