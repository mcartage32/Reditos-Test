import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StatusSeeder } from './status/status.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const statusSeederService = app.get(StatusSeeder);
  await statusSeederService.seedStatus();

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
