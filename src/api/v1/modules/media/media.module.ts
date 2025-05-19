import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { CloudinaryModule } from 'src/api/v1/modules/cloudinary/cloudinary.module';
import { MEDIA_TOKENS } from 'src/api/v1/modules/media/constants/inject-token';
import { CloudinaryService } from 'src/api/v1/modules/cloudinary/cloudinary.service';
import { MediaCommandService } from 'src/api/v1/modules/media/services/media-command.service';
import { CLOUDINARY_TOKENS } from 'src/api/v1/modules/cloudinary/constants/inject-token';

@Module({
    imports: [CloudinaryModule],
    controllers: [MediaController],
    providers: [
        {
            provide: CLOUDINARY_TOKENS.PROVIDER,
            useClass: CloudinaryService,
        },
        {
            provide: MEDIA_TOKENS.SERVICES.COMMAND,
            useClass: MediaCommandService,
        },
    ],
    exports: [MEDIA_TOKENS.SERVICES.COMMAND],
})
export class MediaModule {}
