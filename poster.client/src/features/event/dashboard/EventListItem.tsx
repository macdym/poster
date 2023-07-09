import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Divider,
  LinearProgress,
  Avatar,
  Collapse,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Translations } from "../../../app/common/translations";
import {
  AccessTimeFilled,
  ArrowForwardIosOutlined,
  LocationCity,
} from "@mui/icons-material";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useStore } from "../../../app/store/store";
import moment from "moment";
import { Event } from "../../../app/models/event";
import EventListItemUsers from "./EventListItemUsers";
import { Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import nophoto from "../../../app/assets/nophoto.jpeg";

interface Props {
  event: Event;
  fromProfile: boolean;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EventListItem = ({ event, fromProfile = false }: Props) => {
  const { eventStore, userStore } = useStore();
  const { delete: deleteEvent, loading } = eventStore;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    <>
      <Card
        key={event.id}
        style={{
          position: "relative",
        }}
      >
        <CardHeader
          avatar={<Avatar src={event.vendor?.image ?? nophoto} />}
          title={
            <h3 style={{ marginBottom: 0, marginTop: 0 }}>{event.title}</h3>
          }
          subheader={
            <Link
              to={`/users/${event.vendor?.userName}`}
              style={{ color: "black" }}
            >
              <Typography fontSize={12}>
                Organizator: {event.vendor?.displayName}
              </Typography>
            </Link>
          }
        />
        <CardContent style={{ padding: 0 }}>
          <Divider />
          <div style={{ marginBottom: 10, padding: 15 }}>
            <Typography>{event.description}</Typography>
          </div>
          <Divider />
          <div style={{ padding: "10px 0px 0px 10px" }}>
            <Typography fontSize={12}>
              <AccessTimeFilled fontSize="inherit" />{" "}
              {moment(event.date).format("YYYY-MM-DD HH:mm")}
              <LocationCity
                fontSize="inherit"
                style={{ marginLeft: 15 }}
              />{" "}
              {event.city} {event.place}
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Chip label={event.category} variant="outlined" />
          {(isGoing() || isHosting()) && (
            <Label basic color="green">
              {isHosting()
                ? "Jesteś organizatorem"
                : "Bierzesz udział w wydarzeniu"}
            </Label>
          )}
          {!event?.isActive && (
            <Label color="red" basic>
              Wydarzenie anulowane
            </Label>
          )}
          {!fromProfile && isHosting() && event.isActive && (
            <Tooltip arrow placement="bottom" title="Anuluj wydarzenie">
              <Button
                variant="contained"
                color="warning"
                style={{ marginLeft: 10 }}
                onClick={() =>
                  eventStore.updateAttendance(event, false)
                }
              >
                <EventBusyIcon />
              </Button>
            </Tooltip>
          )}
          <Button
            variant="contained"
            color="secondary"
            style={{
              marginLeft: "auto",
            }}
            endIcon={<ArrowForwardIosOutlined />}
            href={`/event/${event.id}`}
          >
            {Translations.Buttons.Details}
          </Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            style={{
              marginLeft: 5,
            }}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <EventListItemUsers users={event.users} />
          </CardContent>
        </Collapse>
      </Card>
      {loading && <LinearProgress key={event.id} />}
    </>
  );
};

export default EventListItem;
