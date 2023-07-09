import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import moment from "moment";
import pokazMody from "../../../app/assets/pokazMody.jpeg";
import { Event } from "../../../app/models/event";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Props {
  event: Event;
}

const EventDetailsHeader = ({ event }: Props) => {
  const getMainPhoto = () => {
    if (event.photos && event.photos?.length > 0) {
      return event.photos.find((item) => item.isMain)?.url;
    } else {
      return pokazMody;
    }
  };
  return (
    <Paper
      sx={{
        height: 430,
        position: "relative",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        mb: 2,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${getMainPhoto()})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      }}
    >
      {<img style={{ display: "none" }} src={getMainPhoto()} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Box
          sx={{
            position: "relative",
            p: { xs: 3, md: 6 },
            pr: { md: 0 },
          }}
        >
          {!event?.isActive && (
            <Label
              color="red"
              style={{
                marginTop: 5,
                position: "absolute",
                zIndex: 1000,
                left: -14,
                top: 5,
              }}
              ribbon
            >
              Wydarzenie anulowane
            </Label>
          )}
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {event?.title}
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            {moment(event?.date).format("YYYY-MM-DD")}
          </Typography>
          <Link
            to={`/users/${event?.vendor?.userName}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={event?.vendor?.userName}
          >
            <Typography variant="h5" color="inherit" paragraph>
              Organizator: {event?.vendor?.displayName}
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Paper>
  );
};

export default EventDetailsHeader;
