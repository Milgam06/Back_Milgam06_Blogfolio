import { HttpStatus, Injectable } from '@nestjs/common';
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
    const uploadedImageUrl = await Promise.all(
      stepImages.map(async (image) => {
        const filePath = `step/${image.originalname}`;
        const { error: uploadError } = await this.supabaseStorage.upload(
          filePath,
          image.buffer,
          { contentType: image.mimetype },
        );

        const {
          data: { publicUrl },
        } = this.supabaseStorage.getPublicUrl(filePath);
        console.log('Public URL:', publicUrl);

        if (uploadError) {
          throw new Error('Failed to upload image: ' + uploadError.message);
        }

        return publicUrl;
      }),
    );
    return uploadedImageUrl;
  }

  async execute({
    input,
    stepImages,
  }: IStep_Upload_Execute): Promise<Step_Upload_OutputDto> {
    console.log('Received step upload input:', input);
    const { title, content } = input;
    console.log('Received step upload input:', input);
    const uploadedImageUrl = await this.uploadStepImage(stepImages);

    await this.prismaService.step.create({
      data: {
        title,
        content,
        stepImageUrl: uploadedImageUrl,
      },
    });

    return { message: 'Successfully uploaded', status: HttpStatus.OK };
  }
}
