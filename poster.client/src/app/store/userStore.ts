import { makeAutoObservable, runInAction } from "mobx";
import {
  ChangePasswordForm,
  UpdateUserForm,
  User,
  UserForm,
} from "../models/user";
import { Event } from "../models/event";
import agent from "../api/agent";
import { store } from "./store";
import { router } from "../router/routes";

export default class UserStore {
  user: User | null = null;
  selectedUser: User | null = null;
  registerFormOpen = false;
  events: Event[] = [];
  isPasswordChangeFormOpen = false;
  users: User[] = [];
  editMode = false;
  loading = false;
  loadingInitial = true;
  followings: User[] = [];
  followers: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get isCurrentUser() {
    return (
      this.user &&
      this.selectedUser &&
      this.user.userName === this.selectedUser.userName
    );
  }

  updateFollowing = async (username: string, following: boolean) => {
    this.setLoading(true);
    try {
      await agent.Users.updateFollowing(username).then(() => {
        this.getByName(username);
      });
    } catch (error) {
      console.log(error);
    }
    this.setLoading(false);
  };

  login = async (creds: UserForm) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.setUser(user);
      router.navigate("/event");
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserForm, isManage: boolean = false) => {
    this.setLoading(true);
    try {
      const user = await agent.Account.register(creds);
      if (!isManage) {
        store.commonStore.setToken(user.token);
        this.setUser(user);
        router.navigate("/event");
      } else {
        this.getAll();
      }
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
    this.setRegisterFormClose();
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.setUser(null);
    router.navigate("/");
  };

  setUser = (user: User | null = null) => {
    this.user = user;
  };

  setSelectedUser = (user: User) => {
    this.selectedUser = user;
  };

  setRegisterFormOpen = () => {
    this.registerFormOpen = true;
  };
  setRegisterFormClose = () => {
    this.registerFormOpen = false;
  };

  setPasswordChangeFormOpen = () => {
    this.isPasswordChangeFormOpen = true;
  };
  setPasswordChangeFormClose = () => {
    this.isPasswordChangeFormOpen = false;
  };

  getUser = async () => {
    try {
      const user = await agent.Account.getUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      this.users = await agent.Users.getAll();
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
    this.setLoading(false);
  };

  getByName = async (name: string, initial: boolean = false) => {
    if (initial) {
      this.setLoadingInitial(true);
    }

    try {
      var user = await agent.Users.getByName(name);
      this.setSelectedUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoadingInitial(false);
    }
  };

  submitForm = async (user: User) => {
    this.setLoading(true);
    try {
      if (user.id) {
        await agent.Users.update(user);
      } else {
        await agent.Users.create(user);
      }
    } catch (error) {
      console.log(error);
    }
    this.getAll();
    this.setEditMode(false);
  };

  uploadPhoto = async (
    file: Blob,
    username: string,
    isBackgroundPhoto: boolean = false
  ) => {
    this.setLoading(true);
    try {
      await agent.Users.uploadPhoto(file, isBackgroundPhoto);
      this.getByName(username);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  setMain = async (
    id: string,
    username: string,
    background: boolean = false
  ) => {
    this.setLoading(true);
    try {
      await agent.Users.setMain(id, background);
      this.getByName(username);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  deletePhoto = async (id: string, username: string) => {
    this.setLoading(true);
    try {
      await agent.Users.deletePhoto(id);
      this.getByName(username);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateUserProfile = async (
    user: UpdateUserForm,
    username: string | undefined
  ) => {
    this.setLoading(true);
    try {
      if (username) {
        user.username = username;
        await agent.Users.updateUserProfile(username, user);
        this.getByName(username);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  changePassword = async (
    form: ChangePasswordForm,
    username: string | undefined
  ) => {
    this.setLoading(true);
    try {
      if (username) {
        form.username = username;
        await agent.Account.changePassword(form, username);
        this.getByName(username);
      }
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
    this.setPasswordChangeFormClose();
  };

  resetPassword = async (username: string | undefined) => {
    this.setLoading(true);
    try {
      if (username) {
        await agent.Account.resetPassword(username);
      }
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  };

  udpateRole = async (username: string | undefined, role: string) => {
    this.setLoading(true);
    try {
      if (username) {
        await agent.Account.udpateRole(username, { role });
        this.getAll();
      }
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  };

  deactivateProfile = async (
    username: string | undefined,
    manage: boolean = false
  ) => {
    this.setLoading(true);
    try {
      if (username) {
        await agent.Account.deactivate(username);
        if (manage) {
          this.getAll();
        } else {
          this.logout();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  activateProfile = async (username: string | undefined) => {
    this.setLoading(true);
    try {
      if (username) {
        await agent.Account.activate(username);
        this.getAll();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  delete = async (id: string) => {
    this.setLoading(true);
    try {
      await agent.Users.delete(id);
      this.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  getFollowings = async (predicate: string) => {
    this.setLoading(true);
    try {
      if (this.selectedUser != null && predicate === "following") {
        const followings = await agent.Users.getFollowings(
          this.selectedUser?.userName,
          predicate
        );
        runInAction(() => {
          this.followings = followings;
        });
      } else if (this.selectedUser != null && predicate === "followers") {
        const followers = await agent.Users.getFollowings(
          this.selectedUser?.userName,
          predicate
        );
        runInAction(() => {
          this.followers = followers;
        });
      }
    } catch (error) {
      console.log(error);
    }
    this.setLoading(false);
  };

  setAktywnosci = (events: Event[]) => {
    this.events = events;
  };

  openEditDialog = (user: User | null = null) => {
    this.setSelected(user);
    this.setEditMode(true);
  };

  closeEditDialog = () => {
    this.setSelected(null);
    this.setEditMode(false);
  };

  setMiejsca = (users: User[]) => {
    this.users = users;
  };

  setSelected = (user: User | null) => {
    this.user = user;
  };

  setEditMode = (state: boolean) => {
    this.editMode = state;
  };

  setLoading = (state: boolean) => {
    this.loading = state;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
