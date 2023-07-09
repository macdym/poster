import { Photo, User } from "./user";

export interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  categoryId?: number;
  category: string;
  cityId?: number;
  city: string;
  placeId?: number;
  place: string;
  vendor?: User;
  isActive?: boolean;
  users?: User[];
  photos?: Photo[];
}
