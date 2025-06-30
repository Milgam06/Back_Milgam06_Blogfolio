import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { SupabaseModule } from './supabase';
import { StepModule } from './step';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StepModule,
    PrismaModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
