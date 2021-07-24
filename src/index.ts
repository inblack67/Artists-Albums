import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub } from 'graphql-subscriptions';
import cors from 'cors';
import { getSchema } from './graphql';
import { getMyPrismaClient } from './prisma';
import { IContext } from './interfaces';

const main = async () => {
  const prisma = getMyPrismaClient();
  const pubsub = new PubSub();

  const app = express();

  app.use(cors());

  const schema = getSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }): IContext => ({
      req,
      res,
      prisma,
      pubsub,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 4000;

  const httpServer = http.createServer(app);

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: httpServer,
      // path: `/graphql`,
    },
  );

  httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

main().catch((err) => console.error(err));
