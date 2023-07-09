import axios, { AxiosError, AxiosResponse } from "axios";
import { Event } from "../models/event";
import { Category } from "../models/category";
import { Place } from "../models/place";
import { City } from "../models/city";
import { EventFilter } from "../models/eventFilter";
import { toast } from "react-toastify";
import { router } from "../router/routes";
import { ChangePasswordForm, Photo, User, UserForm } from "../models/user";
import { store } from "../store/store";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") {
      await sleep(500);
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;

    const errors = JSON.stringify(data);

    switch (status) {
      case 400:
        toast.error(`bad request: ${errors}`);
        break;
      case 401:
        toast.error(`unauthorized: brak uprawnień do przeglądania zawartości`);
        router.navigate("/");
        break;
      case 403:
        router.navigate("/forbidden");
        toast.error(`forbidden: ${errors}`);
        break;
      case 404:
        router.navigate("/not-found");
        toast.error(`not-found: ${errors}`);
        break;
      case 500:
        toast.error(`server error: ${errors}`);
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, filters?: EventFilter) =>
    axios.get<T>(url, { params: filters }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Event = {
  getAll: () => requests.get<Event[]>("/Event"),
  getById: (id: string) => requests.get<Event>(`/Event/${id}`),
  getFiltered: (filters: EventFilter) =>
    requests.get<Event[]>("/Event/filter", filters),
  getByUser: (username: string) =>
    requests.get<Event[]>(`/Event/${username}/byuser`),
  create: (body: {}) => requests.post<string>("/Event/", body),
  attend: (id: string) => requests.post<void>(`/Event/${id}/attend`, {}),
  update: (id: string, body: {}) =>
    requests.put<void>(`/Event/${id}`, body),
  delete: (id: string) => requests.del<void>(`/Event/${id}`),
  setMain: (id: string, Eventd: string) =>
    requests.post<void>(`/photos/${id}/set-main-Event/${Eventd}`, {}),
  deletePhoto: (id: string, Eventd: string) =>
    requests.del<void>(`/photos/${id}/Event/${Eventd}`),
  uploadPhoto: (id: string, file: any) => {
    let formData = new FormData();
    formData.append("Id", id);
    formData.append("File", file);
    return axios.post<Photo>("photos/Event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
const Category = {
  getAll: () => requests.get<Category[]>("/category"),
  getById: (id: number) => requests.get<Category>(`/category/${id}`),
  create: (body: {}) => requests.post<void>("/category/", body),
  update: (body: {}) => requests.put<void>("/category/", body),
  delete: (id: number) => requests.del<void>(`/category/${id}`),
};
const City = {
  getAll: () => requests.get<City[]>("/city"),
  getById: (id: number) => requests.get<City>(`/city/${id}`),
  create: (body: {}) => requests.post<void>("/city/", body),
  update: (body: {}) => requests.put<void>("/city/", body),
  delete: (id: number) => requests.del<void>(`/city/${id}`),
};
const Place = {
  getAll: () => requests.get<Place[]>("/Place"),
  getById: (id: number) => requests.get<Place>(`/Place/${id}`),
  getByCityId: (id: number) =>
    requests.get<Place[]>(`/Place/City/${id}`),
  create: (body: {}) => requests.post<void>("/Place/", body),
  update: (body: {}) => requests.put<void>("/Place/", body),
  delete: (id: number) => requests.del<void>(`/Place/${id}`),
};
const Account = {
  getUser: () => requests.get<User>("account"),
  login: (user: UserForm) => requests.post<User>("/account/login", user),
  register: (user: UserForm) => requests.post<User>("/account/register", user),
  changePassword: (passwordForm: ChangePasswordForm, username: string) =>
    requests.put<void>(`/account/${username}/changePassword`, passwordForm),
  deactivate: (username: string) =>
    requests.put<void>(`/account/${username}/deactivate`, {}),
  activate: (username: string) =>
    requests.put<void>(`/account/${username}/activate`, {}),
  resetPassword: (username: string) =>
    requests.put<void>(`/account/${username}/reset-password`, {}),
  udpateRole: (username: string, body: {}) =>
    requests.put<void>(`/account/${username}/update-role`, body),
};
const Users = {
  getAll: () => requests.get<User[]>("/users"),
  getByName: (username: string) => requests.get<User>(`/users/${username}`),
  uploadPhoto: (file: any, isBackgroundPhoto: boolean = true) => {
    let formData = new FormData();
    formData.append("File", file);
    formData.append("IsBackgroundPhoto", isBackgroundPhoto + "");
    return axios.post<Photo>("photos/user", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMain: (id: string, background: boolean) =>
    requests.post<void>(`/photos/${id}/set-main?background=${background}`, {}),
  deletePhoto: (id: string) => requests.del<void>(`/photos/${id}`),
  updateFollowing: (username: string) =>
    requests.post<void>(`/follow/${username}`, {}),
  create: (body: {}) => requests.post<void>("/users/", body),
  update: (body: {}) => requests.put<void>("/users/", body),
  updateUserProfile: (username: string, body: {}) =>
    requests.put<void>(`/users/${username}/update-profile`, body),
  delete: (id: string) => requests.del<void>(`/users/${id}`),
  getFollowings: (username: string, predicate: string) =>
    requests.get<User[]>(`/follow/${username}?predicate=${predicate}`),
};

const agent = {
  Event,
  Category,
  City,
  Place,
  Account,
  Users,
};

export default agent;
