import { HttpStatus } from '@nestjs/common';

export class Step_Upload_InputDto {
  title: string;
  content: string;
}

export class Step_Upload_OutputDto {
  message: string;
  status: HttpStatus;
}
