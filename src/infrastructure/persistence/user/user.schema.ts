import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../../domain/enums/role.enum';

export type UserDocument = HydratedDocument<UserSchema>;

@Schema({
  timestamps: true,
})
export class UserSchema {
  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;

  @Prop({
    type: String,
    enum: Object.values(Role),
    required: true,
  })
  role!: Role;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
