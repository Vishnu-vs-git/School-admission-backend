import { User } from '../../../domain/entities/user.entity';
import { UserDocument } from './user.schema';

export class UserFactory {
  static toDomain(document: UserDocument): User {
    return new User({
      id: document._id.toString(),
      name: document.name,
      email: document.email,
      password: document.password,
      role: document.role,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
  static toDomainList(documents: UserDocument[]): User[] {
    return documents.map((d) => this.toDomain(d));
  }
}
