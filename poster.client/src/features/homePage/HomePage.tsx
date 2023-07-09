import { Container, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useStore } from "../../app/store/store";
import LoginForm from "../users/LoginForm";
import { Grid, Button } from "@mui/material";
import YouTube, { YouTubeProps } from "react-youtube";
import Copyright from "../../app/components/copyright";

const HomePage = () => {
  const { userStore } = useStore();

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "540",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      {userStore.isLoggedIn ? (
        <Grid
          container
          sx={{
            alignItems: "center",
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <Grid
            container
            spacing={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <YouTube
              videoId="LGKlOmnKfpU"
              opts={opts}
              onReady={onPlayerReady}
            />
          </Grid>
            <Grid item xs={6}>
              <Link to="/event">
                <Button
                  variant="outlined"
                  style={{
                    borderWidth: 5,
                    borderColor: "white",
                    color: "whitesmoke",
                  }}
                >
                  <Typography variant="h1">Idź do Poster</Typography>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Copyright />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default observer(HomePage);
