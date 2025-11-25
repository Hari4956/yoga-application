// types/user.types.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  country: string;
  mobileNumber: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  country: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  country: string;
  mobileNumber: string;
  password: string;
  role: string;
}

export interface IGetUsersParams {
  page: number;
  limit: number;
}

export interface IUsersResponse {
  users: IUserResponse[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

export interface IUserStats {
  profileCompletion: number;
  accountAge: number;
  isActive: boolean;
}

export interface userId {
  id: string;
}

export interface userLogin {
  email: string;
  password: string;
}
