import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import * as StepServices from './services';
import * as StepResolvers from './resolvers';

const Resolvers = Object.values(StepResolvers);
const Services = Object.values(StepServices);

@Module({
  controllers: [...Resolvers],
  providers: [...Services, PrismaService],
})
export class StepModule {}
