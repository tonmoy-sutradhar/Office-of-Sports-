import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'Hello-World',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Set `true` in production with HTTPS
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
// SELECT * FROM slots;
