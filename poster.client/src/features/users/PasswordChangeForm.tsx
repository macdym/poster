import { observer } from "mobx-react-lite";
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
} from "@mui/material";
import { useStore } from "../../app/store/store";
import { Formik, Form, ErrorMessage } from "formik";
import { Translations } from "../../app/common/translations";
import ValidationError from "../errors/ValidationError";

interface Props {
  isPasswordChangeFormOpen: boolean;
}

const PasswordChangeForm = ({ isPasswordChangeFormOpen }: Props) => {
  const { userStore } = useStore();

  return (
    <Dialog open={isPasswordChangeFormOpen} maxWidth="sm">
      <Box sx={{ padding: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            {Translations.PasswordChangeForm.Title}
          </Typography>
        </Box>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            error: null,
          }}
          onSubmit={(values, { setErrors }) => {
            userStore
              .changePassword(values, userStore.selectedUser?.userName)
              .catch((error) => setErrors({ error: error }));
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  name="currentPassword"
                  color="secondary"
                  type="password"
                  label={Translations.PasswordChangeForm.CurrentPassword}
                  value={values.currentPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  name="newPassword"
                  color="secondary"
                  type="password"
                  label={Translations.PasswordChangeForm.NewPassword}
                  value={values.newPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  name="confirmPassword"
                  color="secondary"
                  type="password"
                  label={Translations.PasswordChangeForm.ConfirmPassword}
                  value={values.confirmPassword}
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
                {Translations.PasswordChangeForm.ChangePassword}
              </Button>
              <Button
                color="secondary"
                fullWidth
                onClick={userStore.setPasswordChangeFormClose}
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

export default observer(PasswordChangeForm);
