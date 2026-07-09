import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../../domain/enums/role.enum';

export type UserDocument = HydratedDocument<UserSchema>;

export interface IUserPersistence {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({ timestamps: true })
export class UserSchema implements IUserPersistence {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    type: String,
    enum: Object.values(Role),
    required: true,
  })
  role!: Role;

  createdAt!: Date;
  updatedAt!: Date;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
