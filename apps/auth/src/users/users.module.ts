import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './models/users.schema';
import { ModelDefinition } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';

const userModel: ModelDefinition = {
  name: UserDocument.name,
  schema: UserSchema,
};

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([userModel]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
