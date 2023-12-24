import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Notes manager')
    .setDescription('The Notes manager API')
    .setVersion('1.0')
    .addTag('notes')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Token',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use('/apidoc-json/', (_req: Request, res: Response) =>
    res.send(document),
  );

  await app.listen(3000);
}
bootstrap();
