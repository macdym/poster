import { observer } from "mobx-react-lite";
import {
  Dialog,
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useStore } from "../../app/store/store";
import { Formik, Form, ErrorMessage } from "formik";
import { Translations } from "../../app/common/translations";
import ValidationError from "../errors/ValidationError";

interface Props {
  isRegisterFormOpen: boolean;
  isManage?: boolean;
}

const RegisterForm = ({ isRegisterFormOpen, isManage = false }: Props) => {
  const { userStore } = useStore();

  return (
    <Dialog open={isRegisterFormOpen} maxWidth="sm">
      <Box sx={{ padding: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h4">{Translations.LoginForm.NewUser}</Typography>
        </Box>
        <Formik
          initialValues={{
            displayName: "",
            userName: "",
            email: "",
            password: "",
            error: null,
          }}
          onSubmit={(values, { setErrors }) =>
            userStore
              .register(values, isManage)
              .catch((error) => setErrors({ error: error }))
          }
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  autoFocus
                  name="displayName"
                  color="secondary"
                  label={Translations.LoginForm.DisplayName}
                  value={values.displayName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  name="userName"
                  color="secondary"
                  label={Translations.LoginForm.UserName}
                  value={values.userName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  name="email"
                  color="secondary"
                  label={Translations.LoginForm.Email}
                  value={values.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  name="password"
                  type="password"
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
                sx={{ mt: 3, mb: 1 }}
              >
                {isManage ? "Zapisz" : Translations.LoginForm.Register}
              </Button>
              <Button
                color="secondary"
                fullWidth
                onClick={userStore.setRegisterFormClose}
              >
                {Translations.Buttons.Anuluj}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default observer(RegisterForm);
