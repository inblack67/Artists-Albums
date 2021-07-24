import { subscriptionType } from 'nexus';
import { ARTIST_UPDATE } from '../constants';
import { pubsub } from './pubsub';
import { ArtistType } from './types';

export const Subscription = subscriptionType({
  definition(t) {
    t.field('artistChanges', {
      type: ArtistType,
      subscribe: () => {
        return pubsub.asyncIterator(ARTIST_UPDATE);
      },
      resolve: (pubsubPayload) => {
        console.log('pubsubPayload = ', pubsubPayload);
        return pubsubPayload;
      },
    });
  },
});
