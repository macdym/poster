import { observer } from "mobx-react-lite";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useStore } from "../../../app/store/store";
import {
  Paper,
  Typography,
  Box,
  ButtonGroup,
  Button,
  Divider,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

const EventPhotoList = () => {
  const { eventStore, userStore } = useStore();
  const { event } = eventStore;
  const photos = event?.photos;

  const isHosting = (): boolean => {
    return eventStore.event?.vendor?.userName === userStore.user?.userName;
  };

  return (
    <Paper sx={{ mt: 2, mb: 2, p: 2 }}>
      <Box sx={{ display: "flex" }}>
        <InsertPhotoIcon sx={{ marginRight: 1 }} />
        <Typography variant="h5">Galeria</Typography>
      </Box>
      <Divider style={{ marginBottom: 2 }} />
      <ImageList
        sx={{ width: "auto", height: "auto" }}
        variant="quilted"
        cols={3}
        rowHeight={221}
      >
        {photos ? (
          photos?.map((photo) => (
            <ImageListItem key={photo.id}>
              <img src={photo.url} loading="lazy" />
              {isHosting() && photo.isMain && (
                <Button fullWidth variant="contained" color="success">
                  Wybrano
                </Button>
              )}
              {isHosting() && !photo.isMain && event.isActive && (
                <>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (event) eventStore.setMain(photo.id);
                      }}
                    >
                      Wybierz
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        if (event) eventStore.deletePhoto(photo.id);
                      }}
                    >
                      Usuń
                    </Button>
                  </ButtonGroup>
                </>
              )}
            </ImageListItem>
          ))
        ) : (
          <></>
        )}
      </ImageList>
    </Paper>
  );
};

export default observer(EventPhotoList);
