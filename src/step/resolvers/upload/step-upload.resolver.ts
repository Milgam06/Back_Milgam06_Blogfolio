import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Step_Upload_InputDto, Step_Upload_OutputDto } from 'src/dto';
import { Step_UploadService } from 'src/step/services';

@Controller('/step/upload')
export class Step_UploadResolver {
  constructor(private readonly stepUploadService: Step_UploadService) {}

  @UseInterceptors(FilesInterceptor('stepImages'))
  @Post()
  async uploadStep(
    @Body() input: Step_Upload_InputDto,
    @UploadedFiles() stepImages: Express.Multer.File[],
  ): Promise<Step_Upload_OutputDto> {
    const { title, content } = input;
    return this.stepUploadService.execute({
      title,
      content,
      stepImages,
    });
  }
}
