import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // Habilita el parsing de cookies
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist hace que solo se admitan las propiedades del DTO y ninguna adicional.
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3000', 'https://phyes-soft-frontend.vercel.app'],
    credentials: true,
  });

  //genero el Document Builder donde preconfiguro los datos basicos
  const swaggerConfig = new DocumentBuilder()
    .setTitle('StyleFlow - Backend para SaaS de Indumentaria')
    .setDescription(
      'Esta es una API REST para StyleFlow. Buscamos traer beneficios a los comercios de indumentaria a bajo costo',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  //creo el documento. le asigno la ruta "api"
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      docExpansion: 'none', // This ensures all tags start collapsed
    },
  });

  await app.listen(4000);
  console.log('Server Listening on Port 4000');
}
bootstrap();
