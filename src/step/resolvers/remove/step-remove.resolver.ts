import { Body, Controller, Post } from '@nestjs/common';
import { Step_Remove_InputDto, Step_Remove_OutputDto } from 'src/dto';
import { Step_RemoveService } from 'src/step/services';

@Controller('/step/remove')
export class Step_RemoveResolver {
  constructor(private readonly stepRemoveService: Step_RemoveService) {}

  @Post()
  async removeStep(
    @Body() input: Step_Remove_InputDto,
  ): Promise<Step_Remove_OutputDto> {
    const { stepId } = input;
    return this.stepRemoveService.execute({ stepId });
  }
}
