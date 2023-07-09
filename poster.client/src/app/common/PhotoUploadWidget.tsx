import { Grid, Header, Button } from "semantic-ui-react";
import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "@mui/icons-material";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { LinearProgress } from "@mui/material";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
  wide?: boolean;
}

const PhotoWidgetCropper = ({ imagePreview, setCropper, wide }: Props) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={wide! ? 2400 / 800 : 1}
      aspectRatio={wide! ? 2400 / 800 : 1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

interface DropZoneProps {
  setFiles: (files: any) => void;
}

const dzStyles = {
  cursor: "grab",
  border: "dashed 3px #eee",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px",
  marginTop: "15px",
};

const dzActive = {
  borderColor: "green",
};

const PhotoDropzone = ({ setFiles }: DropZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
    >
      <input {...getInputProps()} />
      <Upload fontSize="large" />
      <Header content="Upuść zdjęcie tutaj lub kliknij..." />
    </div>
  );
};

interface WidgetProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
  wide?: boolean;
}

const PhotoUploadWidget = ({
  loading,
  uploadPhoto,
  wide = false,
}: WidgetProps) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <>
      <Grid style={{ marginTop: 3, marginLeft: 10 }}>
        <Grid.Column width={4}>
          <Header sub content="Krok 1 - Dodaj zdjęcie" />
          <PhotoDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub content="Krok 2 - Zmień rozmiar" />
          {files && files.length > 0 && (
            <PhotoWidgetCropper
              wide={wide}
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub content="Krok 3 - Podgląd & Zapis" />
          {files && files.length > 0 && (
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
          )}
          {files && files.length > 0 && (
            <>
              <Button.Group widths={2}>
                <Button onClick={onCrop} positive icon="check" />
                <Button onClick={() => setFiles([])} icon="close" />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PhotoUploadWidget;
