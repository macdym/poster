import React, { Fragment } from "react";
import { Divider, Stack, Typography, Box } from "@mui/material";
import EventListItem from "./EventListItem";
import { Event } from "../../../app/models/event";
import moment from "moment";

interface Props {
  groupedEvents: [string, Event[]][];
  groupedBy: string;
}

const EventsList = ({ groupedEvents, groupedBy }: Props) => {
  return (
    <Stack spacing={2}>
      {groupedEvents.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <Typography variant="body2">Nie znaleziono aktywności...</Typography>
        </Box>
      ) : (
        groupedEvents.map(([group, events]) => (
          <Fragment key={"frag" + group}>
            <Divider key={"div" + group} />
            <h4 key={"h4" + group}>
              {groupedBy === "data"
                ? moment(group).format("YYYY-MM-DD")
                : group}
            </h4>
            {events.map((event) => (
              <EventListItem event={event} key={event.id} fromProfile={false} />
            ))}
          </Fragment>
        ))
      )}
    </Stack>
  );
};

export default EventsList;
