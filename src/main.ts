import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração global de validação de DTOs
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
  .setTitle('Golden Raspberry Awards API')
  .setDescription('API para consulta dos piores filmes do Golden Raspberry Awards')
  .setVersion('1.0')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
