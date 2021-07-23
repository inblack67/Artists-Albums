import { Artist } from '@prisma/client';
import { intArg, makeSchema, mutationType, queryType, stringArg } from 'nexus';
import path from 'path';
import { IContext } from '../interfaces';
import { ArtistType, AlbumType } from './types';

const Mutation = mutationType({
  definition(t) {
    t.field('updateArtist', {
      type: 'Boolean',
      args: {
        Name: stringArg(),
        ArtistId: intArg(),
      },
      resolve: async (_, { ArtistId, Name }: Artist, ctx: IContext) => {
        try {
          await ctx.prisma.artist.update({
            data: { Name },
            where: { ArtistId },
          });
          return true;
        } catch (err) {
          console.error(err);
          return err;
        }
      },
    });
  },
});

const Query = queryType({
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

export const getSchema = () => {
  const schema = makeSchema({
    types: { Query, ArtistType, AlbumType, Mutation },
    outputs: {
      schema: path.join(process.cwd(), 'nexus/schema.graphql'),
      typegen: path.join(process.cwd(), 'nexus/nexus.ts'),
    },
  });
  return schema;
};
