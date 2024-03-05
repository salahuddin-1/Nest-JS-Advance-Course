import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './models/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name)
    usersModel: Model<UserDocument>,
  ) {
    super(usersModel);
  }
}
