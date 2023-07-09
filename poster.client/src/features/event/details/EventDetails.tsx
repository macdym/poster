import React, { useEffect } from "react";
import { Grid, LinearProgress } from "@mui/material";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventDetailsChat from "./EventDetailsChat";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsInfo from "./EventDetailsInfo";
import EventDetailsSidebar from "./EventDetailsSidebar";
import EventPhoto from "./EventPhoto";
import EventPhotoList from "./EventPhotoList";

const EventDetails = () => {
  const { eventStore, userStore } = useStore();
  const {
    event,
    getById: getEvent,
    loadingInitial,
    loading,
  } = eventStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEvent(id);
    }
  }, [id, getEvent]);

  const isHosting = (): boolean => {
    return (
      eventStore.event?.vendor?.userName ===
      userStore.user?.userName
    );
  };

  if (loadingInitial || !event) return <LoadingComponent />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        {loading && <LinearProgress color="secondary" />}
        <EventDetailsHeader event={event} />
        {loading && <LinearProgress color="secondary" />}
        <EventDetailsInfo event={event} />
        {loading && <LinearProgress color="secondary" />}
        <EventDetailsChat event={event} />
      </Grid>
      <Grid item xs={4}>
        {loading && <LinearProgress color="secondary" />}
        <EventDetailsSidebar event={event} />
        {loading && <LinearProgress color="secondary" />}
        {event.photos && event.photos.length > 0 && <EventPhotoList />}
        {isHosting() && event.isActive && <EventPhoto />}
      </Grid>
    </Grid>
  );
};

export default observer(EventDetails);
