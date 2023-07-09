import { makeAutoObservable } from "mobx";
import { ChatComment } from "../models/comment";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { store } from "./store";

export default class GlobalChatStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_GLOBALCHAT_URL!, {
        accessTokenFactory: () => store.userStore.user?.token!,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .catch((error) =>
        console.log("Error estabilishing connection: " + error)
      );

    this.hubConnection.on(
      "LoadGlobalChatMessages",
      (comments: ChatComment[]) => {
        this.setComments(comments);
      }
    );

    this.hubConnection.on(
      "ReceiveGlobalChatMessage",
      (comment: ChatComment) => {
        this.addCommentToComments(comment);
      }
    );
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("Error stopping connection: " + error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  setComments = (comments: ChatComment[]) => {
    this.comments = comments;
  };

  addCommentToComments = (comment: ChatComment) => {
    debugger;
    this.comments.push(comment);
  };

  addComment = async (values: any) => {
    this.setLoading(true);
    values.eventId = store.eventStore.event?.id;
    try {
      await this.hubConnection?.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };
}
