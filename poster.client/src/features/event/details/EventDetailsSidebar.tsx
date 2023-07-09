import {
  Card,
  CardHeader,
  ListItem,
  List,
  CardContent,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import { Event } from "../../../app/models/event";
import { Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import nophoto from "../../../app/assets/nophoto.jpeg";

interface Props {
  event: Event;
}

const EventDetailsSidebar = ({ event }: Props) => {
  return (
    <Card key={event?.id}>
      <CardHeader
        titleTypographyProps={{
          align: "center",
        }}
        title={`Liczba uczestników: ${event.users?.length}`}
        sx={{
          bgcolor: "#9c27b0",
          color: "#fff",
        }}
      />
      <CardContent>
        <List>
          {event.vendor && (
            <Link
              to={`/users/${event.vendor.userName}`}
              style={{ textDecoration: "none", color: "inherit" }}
              key={event.vendor.userName}
            >
              <ListItem
                alignItems="flex-start"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={event.vendor.userName}
                    src={event.vendor.image ?? nophoto}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={event.vendor.displayName}
                  secondary={
                    event.vendor.following && (
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Obserwujesz
                      </Typography>
                    )
                  }
                />
                <Chip
                  size="small"
                  color="warning"
                  label="Organizator"
                  style={{ marginRight: "8px" }}
                />
              </ListItem>
              <Divider />
            </Link>
          )}

          {event.users?.map(
            (user) =>
              user.userName !== event.vendor?.userName && (
                <Link
                  to={`/users/${user.userName}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={user.userName}
                >
                  <ListItem
                    alignItems="flex-start"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar alt={user.userName} src={user.image ?? nophoto} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.displayName}
                      secondary={
                        user.following && (
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Obserwujesz
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                  <Divider />
                </Link>
              )
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default EventDetailsSidebar;
