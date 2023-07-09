import {
  Button,
  Box,
  Typography,
  FormControl,
  TextField,
  LinearProgress,
  Paper,
} from "@mui/material";
import { User } from "../../../app/models/user";
import { useStore } from "../../../app/store/store";
import { useState } from "react";
import { Divider, Tab } from "semantic-ui-react";
import InfoIcon from "@mui/icons-material/Info";
import { observer } from "mobx-react-lite";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import PasswordChangeForm from "../PasswordChangeForm";

interface Props {
  profile: User | null;
}

const ProfileBio = ({ profile }: Props) => {
  const { userStore } = useStore();
  const [editBioMode, setEditBioMode] = useState(false);
  const { username } = useParams();

  return (
    <>
      <Tab.Pane
        style={{ color: "black", background: "rgba(255, 255, 255, 0.63)" }}
      >
        {userStore.loading && <LinearProgress color="secondary" />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Formik
            initialValues={{
              displayName: profile?.displayName ?? "",
              email: profile?.email ?? "",
              bio: profile?.bio ?? "",
              error: null,
            }}
            enableReinitialize // Allows reinitializing the form values
            onSubmit={(values, { setErrors, resetForm }) =>
              userStore
                .updateUserProfile(values, username)
                .then(() => {
                  setEditBioMode(false); // Disable edit mode
                })
                .catch((error) => setErrors({ error: error }))
            }
          >
            {({ values, handleChange, errors, resetForm }) => (
              <Form>
                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "left",
                  }}
                >
                  <Box sx={{ alignSelf: "center", marginRight: 2 }}>
                    {<InfoIcon />}
                  </Box>
                  <Typography variant="h5" sx={{ alignSelf: "center" }}>
                    Dane użytkownika
                  </Typography>
                  {userStore.isCurrentUser && (
                    <Button
                      variant="contained"
                      color={editBioMode ? "warning" : "secondary"}
                      style={{ position: "absolute", top: 10, left: 255 }}
                      onClick={() => {
                        if (editBioMode) {
                          resetForm(); // Reset form values
                        }
                        setEditBioMode(!editBioMode);
                      }}
                    >
                      {editBioMode ? "Przerwij edycję" : "Edytuj"}
                    </Button>
                  )}
                  {userStore.isCurrentUser && editBioMode && (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        style={{ position: "absolute", top: 10, left: 425 }}
                        type="submit"
                      >
                        Zapisz zmiany
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ position: "absolute", top: 10, left: 573 }}
                        onClick={userStore.setPasswordChangeFormOpen}
                      >
                        Zmień hasło
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        style={{ position: "absolute", top: 10, left: 710 }}
                        onClick={() => userStore.deactivateProfile(username)}
                      >
                        Dezaktywuj konto
                      </Button>
                    </>
                  )}
                </div>
                <Divider />
                <Paper sx={{ padding: 3 }}>
                  {userStore.isCurrentUser && (
                    <>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField
                          disabled
                          color="secondary"
                          label={"Nazwa użytkownika"}
                          value={profile?.userName}
                        />
                      </FormControl>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <TextField
                          disabled
                          color="secondary"
                          label={"Rola"}
                          value={profile?.role}
                        />
                      </FormControl>
                    </>
                  )}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                      disabled={!editBioMode}
                      color="secondary"
                      required
                      id="displayName"
                      name="displayName"
                      label={"Nawa wyświetlana"}
                      value={values.displayName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                      disabled={!editBioMode}
                      color="secondary"
                      required
                      id="email"
                      name="email"
                      label={"Adres email"}
                      value={values.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <TextField
                      disabled={!editBioMode}
                      color="secondary"
                      multiline
                      rows={4}
                      id="bio"
                      name="bio"
                      label={"Bio"}
                      value={values.bio}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Paper>
              </Form>
            )}
          </Formik>
        </Box>
        <PasswordChangeForm
          isPasswordChangeFormOpen={
            editBioMode && userStore.isPasswordChangeFormOpen
          }
        />
      </Tab.Pane>
    </>
  );
};

export default observer(ProfileBio);
