import { Role } from './role.model';

export class User {
  id: number;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  country: string;
  company: string;
  employees: string;
  phone: string;
  language: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];
}