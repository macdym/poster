import { Header, Item, Reveal, Statistic } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { User } from "../../../app/models/user";
import nophoto from "../../../app/assets/nophoto.jpeg";
import { useStore } from "../../../app/store/store";
import { SyntheticEvent } from "react";

interface Props {
  profile: User | null;
}

const FollowButton = ({ profile }: Props) => {
  const { userStore } = useStore();
  const { updateFollowing, loading } = userStore;

  if (userStore.user?.userName === profile?.userName) return null;

  const handleFollow = (e: SyntheticEvent) => {
    e.preventDefault();
    if (profile != null) {
      profile?.following
        ? updateFollowing(profile?.userName, false)
        : updateFollowing(profile?.userName, true);
    }
  };

  return (
    <Reveal animated="move" style={{ marginTop: 20 }}>
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button fullWidth variant="contained" color="secondary">
          {profile?.following ? "Obserwujesz" : "Nie obserwujesz"}
        </Button>
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100px" }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={(e) => handleFollow(e)}
        >
          {profile?.following ? "Przestań obserwować" : "Obserwuj"}
        </Button>
      </Reveal.Content>
    </Reveal>
  );
};

export default FollowButton;
