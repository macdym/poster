import { Box, Typography, LinearProgress } from "@mui/material";
import { useStore } from "../../../app/store/store";
import { useEffect } from "react";
import { Divider, Tab } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import EventListItem from "../../events/dashboard/EventListItem";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

const ProfileEvents = () => {
  const { userStore, eventStore } = useStore();
  const { username } = useParams();

  useEffect(() => {
    if (username) eventStore.getByUser(username);
  }, [username, eventStore.getByUser]);

  return (
    <>
      <Tab.Pane
        style={{ color: "black", background: "rgba(255, 255, 255, 0.63)" }}
      >
        {userStore.loading && <LinearProgress color="secondary" />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Box sx={{ alignSelf: "center", marginRight: 2 }}>
              <LocalActivityIcon />
            </Box>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              {`Aktywności`}
            </Typography>
          </div>
        </Box>
        {userStore.events.length > 0 ? (
          userStore.events?.map((event) => (
            <div key={event.id}>
              <AktywnoscListItem
                event={event}
                key={event.id}
                fromProfile={true}
              />
              <Divider />
            </div>
          ))
        ) : (
          <Typography variant="h6" sx={{ alignSelf: "center", marginTop: 6 }}>
            Brak aktywności....
          </Typography>
        )}
      </Tab.Pane>
    </>
  );
};

export default observer(ProfileEvents);
