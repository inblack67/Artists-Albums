import { makeSchema } from 'nexus';
import { ArtistType, AlbumType } from './types';
import { Query } from './Query';
import { Mutation } from './Mutation';
import { Subscription } from './Subscription';
import path from 'path';

export const getSchema = () => {
  const schema = makeSchema({
    types: { Query, ArtistType, AlbumType, Mutation, Subscription },
    outputs: {
      schema: path.join(process.cwd(), 'nexus/schema.graphql'),
      typegen: path.join(process.cwd(), 'nexus/nexus.ts'),
    },
  });
  return schema;
};
