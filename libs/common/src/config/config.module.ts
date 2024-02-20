import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

// This config module is gonna be a wrapper around the nestjs-config module
@Module({
  imports: [
    // In this forRoot method, we'll load the environment variables from the .env file
    NestConfigModule.forRoot({}),
  ],
})
export class ConfigModule {}
