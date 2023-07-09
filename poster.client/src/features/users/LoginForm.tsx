import { Formik, Form, ErrorMessage } from "formik";
import { Container, FormControl } from "@mui/material";
import { Translations } from "../../app/common/translations";
import { Label } from "semantic-ui-react";
import {
  Grid,
  Box,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { LockOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import RegisterForm from "./RegisterForm";
import ValidationError from "../errors/ValidationError";

const LoginForm = () => {
  const { userStore } = useStore();

  return (
    <Container style={{ marginTop: "3em" }}>
      <RegisterForm isRegisterFormOpen={userStore.registerFormOpen} />
      <Grid container component="main" sx={{ height: "700px" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlined />
            </Avatar>
            <Formik
              initialValues={{
                email: "",
                password: "",
                error: null,
              }}
              onSubmit={(values, { setErrors }) =>
                userStore
                  .login(values)
                  .catch((error) => setErrors({ error: error.status === 401 ? "Wprowadziłeś niepoprawny Email lub hasło" : error }))
              }
            >
              {({ values, handleChange, errors }) => (
                <Form>
                  <FormControl fullWidth sx={{ mb: 1, mt: 2 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      autoComplete="email"
                      autoFocus
                      color="secondary"
                      label={Translations.LoginForm.Email}
                      value={values.email}
                      onChange={handleChange}
                    />{" "}
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      color="secondary"
                      required
                      label={Translations.LoginForm.Password}
                      value={values.password}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <ErrorMessage
                    name="error"
                    render={() => <ValidationError errors={errors.error} />}
                  />

                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {Translations.LoginForm.Login}
                  </Button>
                  <Button
                    fullWidth
                    color="secondary"
                    onClick={userStore.setRegisterFormOpen}
                  >
                    {Translations.LoginForm.GoRegister}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default observer(LoginForm);
