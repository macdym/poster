import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

interface Props {
  inverted?: boolean;
  content?: string;
}

const LoadingComponent = ({
  inverted = true,
  content = "Loading...",
}: Props) => {
  return (
    <Backdrop
      open={true}
    >
      <CircularProgress color="secondary" style={{ marginRight: 10 }} />
      <Typography variant="h6">{content}</Typography>
    </Backdrop>
  );
};

export default LoadingComponent;
