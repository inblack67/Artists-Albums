import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { PubSub } from 'graphql-subscriptions';

export interface IContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  pubsub: PubSub;
}
