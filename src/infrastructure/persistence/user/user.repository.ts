import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/interfaces/user.repository';
import { UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { User } from 'src/domain/entities/user.entity';
import { UserFactory } from './user.factory';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const document = await this.userModel.findOne({ email });

    if (!document) {
      return null;
    }

    return UserFactory.toDomain(document);
  }
  async findById(id: string): Promise<User | null> {
    const document = await this.userModel.findById(id);

    if (!document) {
      return null;
    }

    return UserFactory.toDomain(document);
  }
  async create(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return UserFactory.toDomain(createdUser);
  }
}
