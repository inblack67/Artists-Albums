import { Album, Artist, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export interface IContext {
  req: Request;
  res: Response;
  prisma: PrismaClient;
}

export interface IUpdateArtistPubSubPayload extends Artist {
  Albums: Album[];
}
