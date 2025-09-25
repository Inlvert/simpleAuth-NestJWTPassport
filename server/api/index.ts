import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';

let cachedServer: ReturnType<typeof serverless>;

const bootstrapServer = async () => {
  if (!cachedServer) {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    await app.init();
    cachedServer = serverless(server);
  }
  return cachedServer;
};

export default async function handler(req: Request, res: Response) {
  const server = await bootstrapServer();
  return server(req, res);
}

