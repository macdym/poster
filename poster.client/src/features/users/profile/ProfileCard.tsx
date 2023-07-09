import { observer } from "mobx-react-lite";
import { User } from "../../../app/models/user";
import { Card, CardHeader, CardMedia, CardActions } from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import nophoto from "../../../app/assets/nophoto.jpeg";

interface Props {
  profile?: User;
}

const ProfileCard = ({ profile }: Props) => {
  const renderBio = () => {
    return profile?.bio && profile?.bio.length > 24
      ? profile?.bio.substring(0, 24) + " ..."
      : profile?.bio;
  };

  return (
    <Link to={`/users/${profile?.userName}`}>
      <Card sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          height="194"
          image={profile?.image ?? nophoto}
        />
        <CardHeader title={profile?.userName} subheader={renderBio()} />
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          {profile?.followersCount} obserwujacych
        </CardActions>
      </Card>
    </Link>
  );
};

export default observer(ProfileCard);
