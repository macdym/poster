import { Button, Paper } from "@mui/material";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { CalendarMonth, FmdGood, Info } from "@mui/icons-material";
import { useStore } from "../../../app/store/store";
import { Translations } from "../../../app/common/translations";
import { Event } from "../../../app/models/event";
import moment from "moment";

interface Props {
  event: Event;
}

const EventDetailsInfo = ({ event }: Props) => {
  const { userStore, eventStore } = useStore();

  const isGoing = (): boolean => {
    var result = event.users?.find(
      (user) => user.userName === userStore.user?.userName
    );

    return result != null;
  };
  const isHosting = (): boolean => {
    return event.vendor?.userName === userStore.user?.userName;
  };

  return (
    <Paper sx={{ mb: 2 }}>
      <List>
        <ListItem>
          {!isHosting() && !isGoing() && event.isActive && (
            <Button
              color="secondary"
              variant="contained"
              style={{ paddingLeft: 15 }}
              onClick={() => {
                eventStore.updateAttendance(event);
              }}
            >
              {Translations.Buttons.Join}
            </Button>
          )}
          {!isHosting() && isGoing() && event.isActive && (
            <Button
              color="secondary"
              variant="contained"
              style={{ paddingLeft: 15 }}
              onClick={() => eventStore.updateAttendance(event)}
            >
              {Translations.Buttons.CancelAttendance}
            </Button>
          )}
          {isHosting() && (
            <>
              {event?.isActive ? (
                <Button
                  color={"error"}
                  variant="outlined"
                  style={{ paddingLeft: 15 }}
                  onClick={() => eventStore.updateAttendance(event)}
                >
                  {Translations.Buttons.CancelAktywnosc}
                </Button>
              ) : (
                <Button
                  color="success"
                  variant="outlined"
                  style={{ paddingLeft: 15 }}
                  onClick={() => eventStore.updateAttendance(event)}
                >
                  {Translations.Buttons.ActivateAktywnosc}
                </Button>
              )}

              <Button
                disabled={!event?.isActive}
                href={`/editEvent/${event.id}`}
                variant="contained"
                color="warning"
                style={{ marginLeft: "auto", marginRight: 15 }}
              >
                {Translations.Buttons.Manage}
              </Button>
            </>
          )}
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary={event?.description} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText
              primary={moment(event?.date).format("YYYY-MM-DD HH:mm")}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FmdGood />
            </ListItemIcon>
            <ListItemText
              primary={event?.city + ", " + event?.place}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
};

export default EventDetailsInfo;
