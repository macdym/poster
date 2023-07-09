import { Link, Typography } from "@mui/material";


const Copyright = (props) => {
    return (
      <Typography variant="body2" style={{color:"whitesmoke", fontSize: 16}} align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://linkedin.com/in/maciej-d-a37a161a5/">
         Maciej Dymiński
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Copyright;