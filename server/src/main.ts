import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverless from 'serverless-http';

let cachedServer: ReturnType<typeof serverless>;

const bootstrapServer = async () => {
  if (!cachedServer) {
    const server = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    await app.init();
    cachedServer = serverless(server); // serverless wrapper
  }
  return cachedServer;
};

export default async (req, res) => {
  const handler = await bootstrapServer();
  return handler(req, res);
};
