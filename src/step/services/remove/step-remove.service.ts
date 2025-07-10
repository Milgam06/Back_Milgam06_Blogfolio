import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Step_Remove_InputDto, Step_Remove_OutputDto } from 'src/dto';
import { PrismaService } from 'src/prisma';
import { SupabaseService } from 'src/supabase';

@Injectable()
export class Step_RemoveService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  private async deleteStepImage({
    stepImagePath,
  }: {
    stepImagePath: string[];
  }) {
    const { error: deleteError } = await this.supabaseService.storage
      .from('images')
      .remove(stepImagePath);

    if (deleteError) {
      throw new HttpException(
        `Failed to delete step images: ${deleteError.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async execute({
    stepId,
  }: Step_Remove_InputDto): Promise<Step_Remove_OutputDto> {
    const step = await this.prismaService.step.findFirst({
      where: {
        id: stepId,
      },
      select: {
        stepImagePath: true,
      },
    });

    const hasNotStepData = !step;
    if (hasNotStepData) {
      throw new HttpException(
        `There is no step with id: ${stepId}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const { stepImagePath } = step;

    const isStepImageEmpty = stepImagePath.length === 0;
    const stepError = hasNotStepData || isStepImageEmpty;
    if (stepError) {
      throw new HttpException(
        'No step images found to delete',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.deleteStepImage({ stepImagePath });

    await this.prismaService.step.delete({
      where: {
        id: stepId,
      },
    });

    return {
      message: 'Successfully removed',
      status: HttpStatus.OK,
    };
  }
}
