import {
  Button,
  ImageList,
  ImageListItem,
  Box,
  Typography,
  LinearProgress,
  Paper,
} from "@mui/material";
import { Photo } from "../../../app/models/user";
import { useStore } from "../../../app/store/store";
import { useState } from "react";
import { ButtonGroup, Divider, Tab } from "semantic-ui-react";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../../../app/common/PhotoUploadWidget";
import { useParams } from "react-router-dom";

interface Props {
  photos?: Photo[];
}

const ProfileBackgroundPhotosList = ({ photos }: Props) => {
  const { userStore } = useStore();
  const [editPhotoMode, setEditPhotoMode] = useState(false);
  const { username } = useParams();

  const handleAddPhoto = (file: Blob) => {
    if (username) userStore.uploadPhoto(file, username, true).then(() => setEditPhotoMode(false));
  };

  return (
    <>
      {userStore.loading && <LinearProgress color="secondary" />}
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
              {<WallpaperIcon />}
            </Box>
            <Typography variant="h5" sx={{ alignSelf: "center" }}>
              Zdjęcia w tle
            </Typography>
            {userStore.isCurrentUser && (
              <Button
                variant="contained"
                color={editPhotoMode ? "warning" : "secondary"}
                style={{ position: "absolute", top: 10, left: 185 }}
                onClick={() => setEditPhotoMode(!editPhotoMode)}
              >
                {editPhotoMode ? "Przerwij edycję" : "Dodaj zdjęcie"}
              </Button>
            )}
          </div>
          <Divider />
          {photos?.length && !editPhotoMode ? (
            <ImageList cols={5} rowHeight={284} gap={10}>
              {photos?.map((photo) => (
                <Paper>
                  <ImageListItem key={photo.id}>
                    <img src={photo.url} loading="eager" />
                    {photo.isMain && (
                      <Button fullWidth variant="contained" color="success">
                        Wybrano
                      </Button>
                    )}
                    {!photo.isMain && userStore.isCurrentUser && (
                      <Box>
                        <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            if (username)
                              userStore.setMain(photo.id, username, true);
                          }}
                        >
                          Wybierz jako główne
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            if (username)
                              userStore.deletePhoto(photo.id, username);
                          }}
                        >
                          Usuń
                        </Button>
                      </Box>
                    )}
                  </ImageListItem>
                </Paper>
              ))}
            </ImageList>
          ) : editPhotoMode ? (
            <Paper sx={{ padding: 3 }}>
              <PhotoUploadWidget
                loading={userStore.loading}
                uploadPhoto={handleAddPhoto}
                wide={true}
              />
            </Paper>
          ) : (
            <Typography
              variant="h6"
              sx={{ alignSelf: "center", marginTop: 6, marginBottom: 30 }}
            >
              Brak zawarości....
            </Typography>
          )}
        </Box>
      </Tab.Pane>
    </>
  );
};

export default observer(ProfileBackgroundPhotosList);
