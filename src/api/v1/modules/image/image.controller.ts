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

    @Get('transform/:id')
    @Public()
    @ResponseMessage('Image transform successfully')
    async transformImage(@Param('id') id: string, @Query() query: TransformQuery) {
        this.logger.log(`Transform image by id: ${id}`, ImageController.name);
        return this.imageTransformService.transformImage(id, query);
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
