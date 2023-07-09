import React from "react";
import { useStore } from "../../../app/store/store";
import { Divider, Grid, Tab } from "semantic-ui-react";
import { Box, Typography, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileFollowings = () => {
  const { userStore } = useStore();
  const { selectedUser, followings, getFollowings, loading } = userStore;

  return (
    <Tab.Pane
      style={{ color: "black", background: "rgba(255, 255, 255, 0.63)" }}
    >
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
            <PersonIcon />
          </Box>
          <Typography variant="h5" sx={{ alignSelf: "center" }}>
            {`O Mnie`}
          </Typography>
        </div>
        <Divider />
        <Paper sx={{ padding: 3 }}>
          <Typography>{selectedUser?.bio || "Brak opisu..."}</Typography>
        </Paper>
      </Box>
    </Tab.Pane>
  );
};

export default ProfileFollowings;
