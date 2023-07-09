import React, { useEffect } from "react";
import { useStore } from "../../../app/store/store";
import { Divider, Grid, Tab } from "semantic-ui-react";
import {
  Box,
  Typography,
  ImageList,
  LinearProgress,
  Paper,
} from "@mui/material";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ProfileCard from "./ProfileCard";
import { observer } from "mobx-react-lite";

const ProfileFollowers = () => {
  const { userStore } = useStore();
  const { selectedUser, followers, getFollowings, loading } = userStore;

  useEffect(() => {
    getFollowings("followers");
  }, [selectedUser, getFollowings]);

  return (
    <>
      <Tab.Pane
        style={{ color: "black", background: "rgba(255, 255, 255, 0.63)" }}
      >
        {loading && <LinearProgress color="secondary" />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
              <Diversity2Icon />
            </Box>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              {`Osoby które obserwują ${userStore.selectedUser?.displayName}`}
            </Typography>
          </div>
          <Divider />
          {followers.length > 0 ? (
            <ImageList cols={5} rowHeight={284}>
              {followers.map((x) => (
                <ProfileCard key={x.id} profile={x} />
              ))}
            </ImageList>
          ) : (
            <Paper sx={{ padding: 3 }}>
              <Typography>
                {"Nikt nie obserwuje..."}
              </Typography>
            </Paper>
          )}
        </Box>
      </Tab.Pane>
    </>
  );
};

export default observer(ProfileFollowers);
