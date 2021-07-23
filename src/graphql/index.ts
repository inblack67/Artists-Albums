import { makeSchema, mutationType, queryType } from 'nexus';
import path from 'path';

const Mutation = mutationType({
  definition(t) {},
});

const Query = queryType({
  definition(t) {
    t.field('hello', {
      type: 'String',
      resolve: () => 'worlds',
    });
  },
});

export const getSchema = () => {
  const schema = makeSchema({
    types: { Query },
    outputs: {
      schema: path.join(process.cwd(), 'nexus/schema.graphql'),
      typegen: path.join(process.cwd(), 'nexus/nexus.ts'),
    },
  });
  return schema;
};
