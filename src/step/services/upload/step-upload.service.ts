import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Step_Upload_InputDto, Step_Upload_OutputDto } from 'src/dto';
import { PrismaService } from 'src/prisma';
import { SupabaseService } from 'src/supabase';

type IStep_Upload_Execute = {
  input: Step_Upload_InputDto;
  stepImages: Express.Multer.File[];
};

@Injectable()
export class Step_UploadService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  private supabaseStorage = this.supabaseService.storage.from('images');

  private async uploadStepImage(stepImages: Express.Multer.File[]) {
    const uploadedImageData = await Promise.all(
      stepImages.map(async (image) => {
        const filePath = `step/${uuid()}`;
        const { error: uploadError } = await this.supabaseStorage.upload(
          filePath,
          image.buffer,
          { contentType: image.mimetype },
        );

        if (uploadError) {
          throw new HttpException(
            `Failed to upload image: ${uploadError.message}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const {
          data: { publicUrl },
        } = this.supabaseStorage.getPublicUrl(filePath);

        return {
          publicUrl,
          filePath,
        };
      }),
    );

    const stepImageUrl = uploadedImageData.map((data) => {
      return data.publicUrl;
    });

    const stepImagePath = uploadedImageData.map((data) => {
      return data.filePath;
    });

    return { stepImageUrl, stepImagePath };
  }

  async execute({
    input,
    stepImages,
  }: IStep_Upload_Execute): Promise<Step_Upload_OutputDto> {
    const { title, content } = input;

    const { stepImagePath, stepImageUrl } =
      await this.uploadStepImage(stepImages);

    await this.prismaService.step.create({
      data: {
        title,
        content,
        stepImageUrl,
        stepImagePath,
      },
    });

    return { message: 'Successfully uploaded', status: HttpStatus.OK };
  }
}
