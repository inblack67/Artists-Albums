import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { getSchema } from './graphql';
import { getMyPrismaClient } from './prisma';
import { IContext } from './interfaces';

const main = async () => {
  const prisma = getMyPrismaClient();

  const app = express();

  const schema = getSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): IContext => ({
      req,
      res,
      prisma,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
