import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { Header, Item, Reveal, Statistic } from "semantic-ui-react";
import { User } from "../../../app/models/user";
import nophoto from "../../../app/assets/nophoto.jpeg";
import FollowButton from "./FollowButton";
import { useStore } from "../../../app/store/store";
import { useState } from "react";

interface Props {
  profile: User | null;
}

const ProfileHeader = ({ profile }: Props) => {
  const { userStore } = useStore();

  return (
    <Paper
      sx={{
        padding: 3,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url(${profile?.backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid container>
        <Grid item xs={8}>
          <Item.Group>
            <Item>
              <Item.Image avatar size="small" src={profile?.image ?? nophoto} />
              <Item.Content verticalAlign="middle">
                <Header
                  style={{ color: "white" }}
                  as="h1"
                  content={profile?.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid>
        <Grid item xs={4} sx={{ color: "white !important" }}>
          <Statistic.Group widths={2} inverted>
            <Statistic label="Obserwujących" value={profile?.followersCount} />
            <Statistic
              label={
                userStore.user?.userName == profile?.userName
                  ? "Obserwujesz"
                  : "Obserwuje"
              }
              value={profile?.followingsCount}
            />
          </Statistic.Group>
          <Divider sx={{ borderColor: "white" }} />
          <FollowButton profile={profile} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default observer(ProfileHeader);
