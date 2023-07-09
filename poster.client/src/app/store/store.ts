import { createContext, useContext } from "react";
import EventStore from "./eventStore";
import CategoryStore from "./categoryStore";
import PlaceStore from "./placeStore";
import CityStore from "./cityStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import CommentStore from "./commentStore";
import GlobalChatStore from "./globalChatStore";

interface Store {
  eventStore: EventStore;
  categoryStore: CategoryStore;
  cityStore: CityStore;
  placeStore: PlaceStore;
  userStore: UserStore;
  commonStore: CommonStore;
  commentStore: CommentStore;
  globalChatStore: GlobalChatStore;
}

export const store: Store = {
  eventStore: new EventStore(),
  categoryStore: new CategoryStore(),
  cityStore: new CityStore(),
  placeStore: new PlaceStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  commentStore: new CommentStore(),
  globalChatStore: new GlobalChatStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
