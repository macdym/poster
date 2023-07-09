import { Event } from "./event";

export interface User {
  id: string;
  userName: string;
  displayName: string;
  bio: string;
  token: string;
  image?: string;
  backgroundImage?: string;
  photos?: Photo[];
  isActive?: boolean;
  email: string;
  role: string;
  followersCount: number;
  followingsCount: number;
  following: boolean;
  aktywnosci?: Event[];
}

export interface UpdateUserForm {
  username?: string;
  displayName?: string;
  bio?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  error?: any;
}

export interface ChangePasswordForm {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  error?: any;
}

export interface UserForm {
  email: string;
  password: string;
  displayName?: string;
  userName?: string;
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
  isBackgroundPhoto: boolean;
}
