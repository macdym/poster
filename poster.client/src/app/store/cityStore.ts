import agent from "../api/agent";
import { City } from "../models/city";
import { makeAutoObservable } from "mobx";

export default class CityStore {
  cities: City[] = [];
  city: City | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  getAll = async () => {
    try {
      this.cities = await agent.City.getAll();
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
    this.setLoading(false);
  };

  getById = async (id: number) => {
    this.setLoadingInitial(true);
    try {
      return await agent.City.getById(id);
    } catch (error) {
      console.log(error);
    }
  };

  submitForm = async (city: City) => {
    this.setLoading(true);
    try {
      if (city.id) {
        await agent.City.update(city);
      } else {
        await agent.City.create(city);
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
      await agent.City.delete(id);
      this.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  openEditDialog = (city: City | undefined = undefined) => {
    this.setSelected(city);
    this.setEditMode(true);
  };

  closeEditDialog = () => {
    this.setSelected(undefined);
    this.setEditMode(false);
  };

  setSelected = (city: City | undefined) => {
    this.city = city;
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
