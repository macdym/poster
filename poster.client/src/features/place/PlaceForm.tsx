import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  LinearProgress,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";
import { Translations } from "../../app/common/translations";
import { Formik, Form } from "formik";
import { Place } from "../../app/models/place";
import { useEffect } from "react";

const PlaceForm = () => {
  const { placeStore, cityStore } = useStore();
  const { editMode, place, closeEditDialog, submitForm, loading } = placeStore;
  const { city, cities } = cityStore;

  useEffect(() => {
    cityStore.getAll();
  }, [editMode]);

  const handleSubmit = (place: Place) => {
    submitForm(place);
  };

  return (
    <Dialog open={editMode} maxWidth="lg">
      <Formik
        initialValues={{
          id: place?.id || undefined,
          name: place?.name || "",
          street: place?.street || "",
          building: place?.building || "",
          city: place?.city || "",
          cityId: place?.cityId || 0,
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <DialogTitle textAlign="center">
              {place
                ? Translations.MiejscaForm.TitleEdit
                : Translations.MiejscaForm.TitleCreate}
            </DialogTitle>
            <DialogContent>
              <div>
                <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
                  <TextField
                    color="secondary"
                    required
                    id="place-name"
                    name="name"
                    label={Translations.MiejscaForm.Nazwa}
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <>
                      <InputLabel id="place-city-label" color="secondary">
                        {Translations.MiejscaForm.Miasto}
                      </InputLabel>
                      <Select
                        label={Translations.MiejscaForm.Miasto}
                        labelId="place-city-label"
                        color="secondary"
                        required
                        id="place-city"
                        name="cityId"
                        value={values.cityId}
                        onChange={handleChange}
                      >
                        {cities.map((city) => {
                          return (
                            <MenuItem key={city.id} value={city.id}>
                              {city.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    color="secondary"
                    required
                    id="place-street"
                    name="street"
                    label={Translations.MiejscaForm.Ulica}
                    value={values.street}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    color="secondary"
                    id="place-building"
                    name="building"
                    label={Translations.MiejscaForm.Budynek}
                    value={values.building}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
              <ButtonGroup style={{ margin: "auto" }}>
                <Button onClick={closeEditDialog}>
                  {Translations.Buttons.Anuluj}
                </Button>
                <Button color="success" type="submit">
                  {Translations.Buttons.Zapisz}
                </Button>
              </ButtonGroup>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(PlaceForm);
