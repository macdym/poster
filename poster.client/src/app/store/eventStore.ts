import agent from "../api/agent";
import { Event } from "../models/event";
import { makeAutoObservable } from "mobx";
import { EventFilter } from "../models/EventFilter";
import { store } from "./store";

export default class EventStore {
  events: Event[] = [];
  groupedEvents: [string, Event[]][] = [];
  event: Event | null = null;
  eventFilter: EventFilter | null = null;
  fromToEnabled = false;
  valueEnabled = false;
  groupedBy = "data";
  editMode = false;
  loading = false;
  loadingInitial = true;
  sorting = true;

  constructor() {
    makeAutoObservable(this);
  }

  uploadPhoto = async (file: Blob) => {
    this.setLoading(true);
    try {
      if (this.event) {
        await agent.Event.uploadPhoto(this.event?.id, file);
        this.getById(this.event?.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  setMain = async (id: string) => {
    this.setLoading(true);
    try {
      if (this.event) {
        await agent.Event.setMain(id, this.event.id);
        this.getById(this.event.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  deletePhoto = async (id: string) => {
    this.setLoading(true);
    try {
      if (this.event) {
        await agent.Event.deletePhoto(id, this.event.id);
        this.getById(this.event.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  updateAttendeeFollowing = (username: string) => {
    
  }

  updateAttendance = async (
    event: Event,
    fromDetails: boolean = true
  ) => {
    this.setLoading(true);
    try {
      await agent.Event.attend(event.id);
      if (fromDetails) {
        this.getById(event.id);
      } else {
        if (this.eventFilter) {
          this.getFiltered(this.eventFilter);
        } else {
          this.getAll();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  groupEvents = (groupBy: string) => {
    this.setGroupedBy(groupBy);
    switch (groupBy) {
      case "data": {
        this.groupedEvents = Object.entries(
          this.events.reduce((events, event) => {
            const date = event.date;
            events[date] = events[date]
              ? [...events[date], event]
              : [event];
            return events;
          }, {} as { [key: string]: Event[] })
        ).sort((a, b) => {
          const dateA = new Date(a[0]).getTime();
          const dateB = new Date(b[0]).getTime();
          return this.sorting ? dateB - dateA : dateA - dateB;
        });
        break;
      }
      case "miasto":
      case "miejsce":
      case "kategoria": {
        this.groupedEvents = Object.entries(
          this.events.reduce((events, event) => {
            const key = event[groupBy];
            events[key] = events[key]
              ? [...events[key], event]
              : [event];
            return events;
          }, {} as { [key: string]: Event[] })
        ).sort((a, b) => {
          return this.sorting
            ? a[0].localeCompare(b[0])
            : b[0].localeCompare(a[0]);
        });
        break;
      }
      default: {
        this.groupedEvents = Object.entries(
          this.events.reduce((events, event) => {
            const date = event.date;
            events[date] = events[date]
              ? [...events[date], event]
              : [event];
            return event;
          }, {} as { [key: string]: Event[] })
        ).sort((a, b) => {
          const dateA = new Date(a[0]).getTime();
          const dateB = new Date(b[0]).getTime();
          return this.sorting ? dateB - dateA : dateA - dateB;
        });
      }
    }
  };

  getAll = async () => {
    this.setEventFilter();
    this.setFromToEnabled(false, this.eventFilter);
    this.setValueEnabled(false, this.eventFilter);
    this.setLoadingInitial(true);
    try {
      this.events = await agent.Event.getAll();
      this.groupEvents(this.groupedBy);
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
  };

  getById = async (id: string) => {
    try {
      this.event = await agent.Event.getById(id);
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
  };

  getByUser = async (username: string) => {
    store.userStore.setLoading(true);
    try {
      const events = await agent.Event.getByUser(username);
      store.userStore.setAktywnosci(events);
    } catch (error) {
      console.log(error);
    }
    store.userStore.setLoading(false);
  };

  getFiltered = async (filter: EventFilter) => {
    this.setEventFilter(filter);
    console.log(this.eventFilter);
    this.setLoadingInitial(true);
    try {
      this.events = await agent.Event.getFiltered(filter);
      this.groupEvents(this.groupedBy);
    } catch (error) {
      console.log(error);
    }
    this.setLoadingInitial(false);
  };

  submitForm = async (event: Event) => {
    try {
      if (event.id) {
        await agent.Event.update(event.id, event);
        return event.id;
      } else {
        return await agent.Event.create(event);
      }
    } catch (error) {
      throw error;
      console.log(error);
    }
    this.setEditMode(false);
  };

  delete = async (id: string) => {
    try {
      await agent.Event.delete(id);
      this.getAll();
    } catch (error) {
      console.log(error);
    }
  };

  cancelEventToogle = async (event: Event) => {
    this.setLoading(true);
    try {
      await agent.Event.attend(event.id);
      this.getById(event.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  setFromToEnabled = (
    state: boolean,
    filter: EventFilter | null = null
  ) => {
    this.fromToEnabled = state;
    if (!state && filter != null) {
      filter.to = "";
      filter.from = "";
      this.setEventFilter(filter);
    }
  };

  setValueEnabled = (state: boolean, filter: EventFilter | null = null) => {
    this.valueEnabled = state;
    if (!state && filter != null) {
      filter.field = "";
      filter.value = "";
      this.setEventFilter(filter);
    }
  };

  setEventFilter = (eventFilter: EventFilter | null = null) => {
    this.eventFilter = eventFilter;
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

  setSorting = () => {
    this.sorting = !this.sorting;
    this.groupEvents(this.groupedBy);
  };

  setGroupedBy = (value: string) => {
    this.groupedBy = value;
  };
}
