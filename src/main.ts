import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('KDDCA API Documentation')
    .setDescription('API endpoints for KDDCA Chess website')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Start the server
  await app.listen(5000);
  console.log('Server running on http://localhost:5000');
  console.log('Swagger documentation available at http://localhost:5000/api-docs');
}
bootstrap();

