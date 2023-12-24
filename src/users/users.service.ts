import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  create(dto: CreateUserDto) {
    const user = new this.usersModel(dto);
    return user.save();
  }

  async getByEmail(email: string): Promise<UserDocument> {
    const user = await this.usersModel.findOne({ email });
    return <UserDocument>user;
  }
}
