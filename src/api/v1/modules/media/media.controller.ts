import {
    Controller,
    Post,
    Delete,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
    Inject,
    LoggerService,
    Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MEDIA_TOKENS } from 'src/api/v1/modules/media/constants/inject-token';
import { IMediaCommandService } from 'src/api/v1/modules/media/interfaces/media-command.service.interface';

@Controller('media')
export class MediaController {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(MEDIA_TOKENS.SERVICES.COMMAND)
        private readonly mediaCommandService: IMediaCommandService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        this.logger.log(`Processing upload request for: ${file?.originalname}`);
        return this.mediaCommandService.uploadImage(file);
    }

    @Delete()
    async deleteImage(@Query('publicId') publicId: string) {
        if (!publicId) {
            throw new BadRequestException('Public ID is required');
        }

        this.logger.log(`Processing delete request for image: ${publicId}`);
        await this.mediaCommandService.deleteImage(publicId);
        return { message: 'Image deleted successfully' };
    }
}
