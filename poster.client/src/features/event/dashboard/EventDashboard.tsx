import { Grid } from "@mui/material";
import EventsList from "./EventsList";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import EventFilters from "./EventFilters";
import EventGlobalChat from "./EventGlobalChat";

const EventDashboard = () => {
  const { eventStore } = useStore();
  const {
    aktywnosci,
    loadingInitial,
    groupEvents: getGroupedEvents,
    groupedEvents,
    getAll: getEvents,
    groupedBy,
  } = eventStore;

  useEffect(() => {
    if (aktywnosci.length === 0) {
      eventStore.getAll().then(() => {
        getGroupedEvents("data");
      });
    }
  }, [getEvents, eventStore.sorting]);

  if (loadingInitial) return <LoadingComponent />;

  const handleGroupBy = (event: React.SyntheticEvent, newValue: string) => {
    getGroupedEvents(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            variant="fullWidth"
            value={groupedBy}
            onChange={handleGroupBy}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Data" value="date" />
            <Tab label="Miasto" value="city" />
            <Tab label="Miejsce" value="place" />
            <Tab label="Kategoria" value="category" />
          </Tabs>
        </Box>
        <EventsList
          groupedEvents={groupedAktywnosci}
          groupedBy={groupedBy}
        />
      </Grid>
      <Grid item xs={4}>
        <div style={{ position: "sticky", top: 70 }}>
          <EventFilters />
          <EventGlobalChat />
        </div>
      </Grid>
    </Grid>
  );
};

export default observer(EventDashboard);
