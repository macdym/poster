import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Translations } from "../../../app/common/translations";
import { Event } from "../../../app/models/event";
import { Formik, Form, ErrorMessage } from "formik";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useNavigate } from "react-router-dom";
import ValidationError from "../../errors/ValidationError";

const EventForm = () => {
  const { eventStore, categoryStore, placeStore, cityStore } =
    useStore();
  const navigate = useNavigate();
  const { event, loadingInitial, setLoadingInitial, setEditMode } =
  eventStore;
  const { categories } = categoryStore;
  const { places, loading } = placeStore;
  const { cities } = cityStore;
  const { id } = useParams();

  useEffect(() => {
    categoryStore.getAll();
    categoryStore.getAll();

    if (id) {
      eventStore.getById(id);
    } else {
      setLoadingInitial(false);
    }
  }, [id, eventStore.getById]);

  useEffect(() => {
    if (event?.cityId) {
      eventStore.getByCityId(event?.miastoId);
    }
  }, [event]);

  const handleCityChange = (id: number | string) => {
    placeStore.getByCityId(parseInt(id.toString()));
  };

  if (loadingInitial && !event) return <LoadingComponent />;

  return (
    <Formik
      initialValues={{
        id: event?.id || "",
        title: event?.tytul || "",
        categoryId: event?.categoryId || 0,
        category: event?.category || "",
        description: event?.description || "",
        city: event?.city || "",
        cityId: event?.cityId || 0,
        place: event?.place || "",
        placeId: event?.placeId || 0,
        date: moment(event?.date).format("YYYY-MM-DDTHH:mm") || "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        eventStore
          .submitForm(values)
          .catch((error) => setErrors({ error: error }))
          
          .then((response) => {
            if (response) {
              navigate(`/event/${response}`);
            }
          })
      }
    >
      {({ values, handleChange, errors }) => (
        <Form style={{ marginTop: event ? 17 : "" }}>
          <Card style={{ padding: 10 }}>
            <CardContent>
              <div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">
                    {event?.id == null
                      ? Translations.EventForm.TitleCreate
                      : Translations.EventForm.TitleEdit}
                  </Typography>
                </Box>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    color="secondary"
                    required
                    id="event-title"
                    name="title"
                    label={Translations.EventForm.Tytul}
                    value={values.title}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="event-category-label" color="secondary">
                    {Translations.EventForm.Kategoria}
                  </InputLabel>
                  <Select
                    label={Translations.EventForm.Kategoria}
                    color="secondary"
                    required
                    labelId="event-category-label"
                    id="event-category"
                    name="categoryId"
                    value={values.categoryId}
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <TextField
                    color="secondary"
                    required
                    multiline
                    rows={4}
                    id="event-description"
                    name="description"
                    label={Translations.EventForm.Opis}
                    value={values.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="event-city-label" color="secondary">
                    {Translations.EventForm.Miasto}
                  </InputLabel>
                  <Select
                    label={Translations.EventForm.Miasto}
                    labelId="event-city-label"
                    color="secondary"
                    required
                    id="event-city"
                    name="cityId"
                    value={values.cityId}
                    onChange={(e) => {
                      handleChange(e);
                      handleCityChange(e.target.value);
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <>
                      <InputLabel
                        id="event-place-label"
                        color="secondary"
                      >
                        {Translations.EventForm.Miejsce}
                      </InputLabel>
                      <Select
                        label={Translations.EventForm.Miejsce}
                        disabled={places.length == 0}
                        labelId="event-place-label"
                        color="secondary"
                        required
                        id="event-place"
                        name="placeId"
                        value={values.placeId}
                        onChange={handleChange}
                      >
                        {places.map((place) => {
                          return (
                            <MenuItem key={place.id} value={place.id}>
                              {place.street + ", " + place.name}
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
                    type="datetime-local"
                    id="event-date"
                    name="date"
                    label={Translations.EventForm.Data}
                    value={values.date}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <ErrorMessage
                name="error"
                render={() => <ValidationError errors={errors.error} />}
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={() => navigate(-1)}
                fullWidth
                color="secondary"
                type="submit"
                variant="outlined"
              >
                {Translations.Buttons.Anuluj}
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                type="submit"
              >
                {Translations.Buttons.Zapisz}
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default observer(EventForm);
