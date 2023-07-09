import agent from "../api/agent";
import { Category } from "../models/category";
import { makeAutoObservable } from "mobx";

export default class KategorieStore {
  categories: Category[] = [];
  category: Category | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  getAll = async () => {
    try {
      this.categories = await agent.Category.getAll();
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
    this.setLoading(false);
  };

  getById = async (id: number) => {
    this.setLoadingInitial(true);
    try {
      return await agent.Category.getById(id);
    } catch (error) {
      console.log(error);
    }
  };

  submitForm = async (category: Category) => {
    this.setLoading(true);
    try {
      if (category.id) {
        await agent.Category.update(category);
      } else {
        await agent.Category.create(category);
      }
    } catch (error) {
      console.log(error);
    }
    this.getAll();
    this.setEditMode(false);
  };

  delete = async (id: number) => {
    this.setLoading(true);
    try {
      await agent.Category.delete(id);
      this.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  openEditDialog = (category: Category | undefined = undefined) => {
    this.setSelected(category);
    this.setEditMode(true);
  };

  closeEditDialog = () => {
    this.setSelected(undefined);
    this.setEditMode(false);
  };

  setSelected = (category: Category | undefined) => {
    this.category = category;
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
