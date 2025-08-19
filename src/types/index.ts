export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  token?: string;
  role: string;
}

export interface AuthState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export interface ITeacher {
  _id?: string;
  name: string;
  subject: string;
  email?: string;
  phone?: string;
  image?: string;
}
