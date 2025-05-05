import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const server = express();

export const createVercelHandler = async (): Promise<(req: VercelRequest, res: VercelResponse) => void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  // Enable CORS
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('KDDCA API Documentation')
    .setDescription('API endpoints for KDDCA Chess website')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();
  
  return (req: VercelRequest, res: VercelResponse) => {
    server(req, res);
  };
};

const handlerPromise = createVercelHandler();

export default async (req: VercelRequest, res: VercelResponse) => {
  const handler = await handlerPromise;
  return handler(req, res);
};