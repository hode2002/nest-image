import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
    LoggerService,
    Query,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { IImageCommandService } from './interfaces/image-command.service.interface';
import { IImageQueryService } from './interfaces/image-query.service.interface';
import { IMAGE_TOKENS } from './constants/inject-token';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { IImageTransformService } from 'src/api/v1/modules/image/interfaces/image-transform.service.interface';
import { TransformQuery } from 'src/api/v1/modules/image/dto/transform-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/get-user.decorator';
import { User } from '@clerk/backend';
import { IImageVariantQueryService } from 'src/api/v1/modules/image/interfaces/image-variant-query.service.interface';

@Controller('images')
export class ImageController {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: LoggerService,
        @Inject(IMAGE_TOKENS.SERVICES.COMMAND)
        private readonly imageCommandService: IImageCommandService,
        @Inject(IMAGE_TOKENS.SERVICES.QUERY)
        private readonly imageQueryService: IImageQueryService,
        @Inject(IMAGE_TOKENS.SERVICES.TRANSFORM)
        private readonly imageTransformService: IImageTransformService,
        @Inject(IMAGE_TOKENS.SERVICES.VARIANT_QUERY)
        private readonly imageVariantQueryService: IImageVariantQueryService,
    ) {}

    @Post()
    @ResponseMessage('Image created successfully')
    create(@Body() createImageDto: CreateImageDto) {
        this.logger.log(`Creating image for user: ${createImageDto.userId}`, ImageController.name);
        return this.imageCommandService.create(createImageDto);
    }

    @Get()
    @ResponseMessage('Images retrieved successfully')
    findAll() {
        this.logger.log('Finding all images', ImageController.name);
        return this.imageQueryService.findAll();
    }

    @Get('user')
    @ResponseMessage('Images retrieved successfully')
    findUserImages(@CurrentUser() user: User) {
        this.logger.log('Finding all images for user', ImageController.name);
        return this.imageQueryService.findUserImages(user);
    }

    @Get('transform/:id')
    @Public()
    @ResponseMessage('Image transform successfully')
    async transformImage(@Param('id') id: string, @Query() query: TransformQuery) {
        this.logger.log(`Transform image by id: ${id}`, ImageController.name);
        return this.imageTransformService.transformImage(id, query);
    }

    @Get(':id/transformed')
    @Public()
    @ResponseMessage('Image transform successfully')
    async getTransformedImage(@Param('id') id: string) {
        this.logger.log(`Finding transformed image: ${id}`, ImageController.name);
        return this.imageVariantQueryService.getTransformedImage(id);
    }

    @Get(':id')
    @Public()
    @ResponseMessage('Images retrieved successfully')
    findOne(@Param('id') id: string) {
        this.logger.log(`Finding image by id: ${id}`, ImageController.name);
        return this.imageQueryService.findById(id);
    }

    @Patch(':id')
    @ResponseMessage('Image updated successfully')
    update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
        this.logger.log(`Updating image: ${id}`, ImageController.name);
        return this.imageCommandService.update(id, updateImageDto);
    }

    @Delete(':id')
    @ResponseMessage('Image deleted successfully')
    remove(@Param('id') id: string) {
        this.logger.log(`Deleting image: ${id}`, ImageController.name);
        return this.imageCommandService.delete(id);
    }
}
