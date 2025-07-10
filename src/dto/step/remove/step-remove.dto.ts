import { HttpStatus } from '@nestjs/common';

export class Step_Remove_InputDto {
  stepId: string;
}

export class Step_Remove_OutputDto {
  message: string;
  status: HttpStatus;
}
