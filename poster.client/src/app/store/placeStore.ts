import agent from "../api/agent";
import { Place } from "../models/place";
import { makeAutoObservable } from "mobx";

export default class PlaceStore {
  places: Place[] = [];
  place: Place | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  getAll = async () => {
    try {
      this.places = await agent.Place.getAll();
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
    this.setLoading(false);
  };

  getById = async (id: number) => {
    this.setLoadingInitial(true);
    try {
      return await agent.Place.getById(id);
    } catch (error) {
      console.log(error);
    }
  };

  getByCityId = async (id: number) => {
    this.setLoading(true);
    try {
      this.places = await agent.Place.getByCityId(id);
    } catch (error) {
      console.log(error);
    }
    this.setLoading(false);
  };

  submitForm = async (place: Place) => {
    this.setLoading(true);
    try {
      if (place.id) {
        await agent.Place.update(place);
      } else {
        await agent.Place.create(place);
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
      await agent.Place.delete(id);
      this.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  openEditDialog = (place: Place | undefined = undefined) => {
    this.setSelected(place);
    this.setEditMode(true);
  };

  closeEditDialog = () => {
    this.setSelected(undefined);
    this.setEditMode(false);
  };

  setMiejsca = (places: Place[]) => {
    this.places = places;
  };

  setSelected = (place: Place | undefined) => {
    this.place = place;
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
