import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageCommandService } from './services/image-command.service';
import { ImageQueryService } from './services/image-query.service';
import { ImageCommandRepository } from './repositories/image-command.repository';
import { ImageQueryRepository } from './repositories/image-query.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { IMAGE_TOKENS } from './constants/inject-token';
import { UserModule } from 'src/api/v1/modules/user/user.module';
import { ImageTransformService } from './services/image-transform.service';
import { CLOUDINARY_TOKENS } from 'src/api/v1/modules/cloudinary/constants/inject-token';
import { CloudinaryService } from 'src/api/v1/modules/cloudinary/cloudinary.service';
import { ImageVariantCommandRepository } from 'src/api/v1/modules/image/repositories/image-variant-command.repository';
import { ImageVariantCommandService } from 'src/api/v1/modules/image/services/image-variant-command.service';
import { ImageVariantQueryService } from 'src/api/v1/modules/image/services/image-variant-query.service';
import { ImageVariantQueryRepository } from 'src/api/v1/modules/image/repositories/image-variant-query.repository';

@Module({
    imports: [PrismaModule, UserModule],
    controllers: [ImageController],
    providers: [
        {
            provide: CLOUDINARY_TOKENS.PROVIDER,
            useClass: CloudinaryService,
        },
        {
            provide: IMAGE_TOKENS.SERVICES.TRANSFORM,
            useClass: ImageTransformService,
        },
        {
            provide: IMAGE_TOKENS.SERVICES.QUERY,
            useClass: ImageQueryService,
        },
        {
            provide: IMAGE_TOKENS.SERVICES.COMMAND,
            useClass: ImageCommandService,
        },
        {
            provide: IMAGE_TOKENS.REPOSITORIES.COMMAND,
            useClass: ImageCommandRepository,
        },
        {
            provide: IMAGE_TOKENS.REPOSITORIES.QUERY,
            useClass: ImageQueryRepository,
        },
        {
            provide: IMAGE_TOKENS.REPOSITORIES.VARIANT_COMMAND,
            useClass: ImageVariantCommandRepository,
        },
        {
            provide: IMAGE_TOKENS.REPOSITORIES.VARIANT_QUERY,
            useClass: ImageVariantQueryRepository,
        },
        {
            provide: IMAGE_TOKENS.SERVICES.VARIANT_COMMAND,
            useClass: ImageVariantCommandService,
        },
        {
            provide: IMAGE_TOKENS.SERVICES.VARIANT_QUERY,
            useClass: ImageVariantQueryService,
        },
    ],
    exports: [
        IMAGE_TOKENS.SERVICES.TRANSFORM,
        IMAGE_TOKENS.SERVICES.COMMAND,
        IMAGE_TOKENS.SERVICES.QUERY,
        IMAGE_TOKENS.REPOSITORIES.COMMAND,
        IMAGE_TOKENS.REPOSITORIES.QUERY,
    ],
})
export class ImageModule {}
