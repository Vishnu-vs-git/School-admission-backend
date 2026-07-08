import { Role } from '../enums/role.enum';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.role = props.role;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}