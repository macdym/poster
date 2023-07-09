import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../../../app/common/PhotoUploadWidget";
import { useStore } from "../../../app/store/store";
import { Paper } from "@mui/material";

const EventPhoto = () => {
  const { eventStore } = useStore();

  const handleAddPhoto = (file: Blob) => {
    if (eventStore.event) eventStore.uploadPhoto(file);
  };

  return (
    <Paper sx={{ mb: 2, mt:2 }}>
      <PhotoUploadWidget
        loading={eventStore.loading}
        uploadPhoto={handleAddPhoto}
      />
    </Paper>
  );
};

export default observer(EventPhoto);
