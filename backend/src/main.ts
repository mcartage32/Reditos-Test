import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StatusSeeder } from './status/status.seeder';
import { PrioritySeeder } from './priority/priority.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const statusSeederService = app.get(StatusSeeder);
  await statusSeederService.seedStatus();

  const prioritySeederService = app.get(PrioritySeeder);
  await prioritySeederService.seedPriorities();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
