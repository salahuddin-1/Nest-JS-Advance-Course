import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

// In this Database module we are wrapping it around the MongoDB database
// This the custom module for the database

// Note:
// For using the ConfigService, we need to import the ConfigModule of the @nestjs/config package
// But we have already created a wrapper around the ConfigModule in our custom ConfigModule in
// the libs/common/src/config/config.module.ts file
// So, the ConfigService that we are injecting and using in the useFactory method is
// getting imported from our ConfigModule
// Our ConfigModule is exporting the ConfigService, so we can use it in the useFactory method

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      // Injecting the ConfigService to use it as an argument in the useFactory method
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // [configService] is the instance of the ConfigService that we are injecting
        // in the above inject property
        return {
          uri: configService.get('MONGODB_URI'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
