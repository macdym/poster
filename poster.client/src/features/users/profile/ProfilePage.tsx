import { observer } from "mobx-react-lite";
import { Grid } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import { useStore } from "../../../app/store/store";
import ProfileContent from "./ProfileContent";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userStore } = useStore();
  const { selectedUser, loadingInitial, getByName } = userStore;
  const { username } = useParams();

  useEffect(() => {
    if (username) getByName(username, true);
  }, [getByName, username]);

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <ProfileHeader profile={selectedUser} />
      </Grid>
      <Grid item xs={12}>
        <ProfileContent profile={selectedUser}/>
      </Grid>
    </Grid>
  );
};

export default observer(ProfilePage);
