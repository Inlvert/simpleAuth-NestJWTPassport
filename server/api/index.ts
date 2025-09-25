import { createServer } from 'http';
import { VercelApiHandler } from '@vercel/node';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../server/src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedServer: VercelApiHandler;

const bootstrapServer = async (): Promise<VercelApiHandler> => {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  app.enableCors();
  await app.init();
  return server;
};

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(req, res);
}
