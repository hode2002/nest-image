import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.use(helmet());
    app.use(compression());
    app.use(cookieParser());

    app.enableCors({
        origin: configService.get<string>('FRONTEND_URL') || 'http://localhost:3000',
        credentials: true,
    });

    app.setGlobalPrefix('api/v1');

    const port = configService.get<number>('PORT') || 3001;
    await app.listen(port);
}

bootstrap();
