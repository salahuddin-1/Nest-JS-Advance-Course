import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// In this Database module we are wrapping it around the MongoDB database
// This the custom module for the database
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/sleepr')],
})
export class DatabaseModule {}
