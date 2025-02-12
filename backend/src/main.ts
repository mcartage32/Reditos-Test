import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StatusSeeder } from './status/status.seeder';
import { PrioritySeeder } from './priority/priority.seeder';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ejecutar seeders
  const statusSeederService = app.get(StatusSeeder);
  await statusSeederService.seedStatus();

  const prioritySeederService = app.get(PrioritySeeder);
  await prioritySeederService.seedPriorities();

  // Configurar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar Swagger en /documentation
  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API para gestión de tareas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Iniciar servidor
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
