import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    TextField,
  } from "@mui/material";
  import { useStore } from "../../app/store/store";
  import { observer } from "mobx-react-lite";
  import { Translations } from "../../app/common/translations";
  import { Formik, Form } from "formik";
  import { City } from "../../app/models/city";
  
  const CityForm = () => {
    const { cityStore } = useStore();
    const { editMode, city, closeEditDialog, submitForm} =
      cityStore;
  
    const handleSubmit = (city: City) => {
        submitForm(city);
    };
  
    return (
      <Dialog open={editMode} maxWidth="lg">
        <Formik
          initialValues={{
            id: city?.id || undefined,
            name: city?.name || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <DialogTitle textAlign="center">
                {city
                  ? Translations.MiastaForm.TitleEdit
                  : Translations.MiastaForm.TitleCreate}
              </DialogTitle>
              <DialogContent>
                <div>
                  <FormControl fullWidth sx={{ m: 2, width: 600 }}>
                    <TextField
                      color="secondary"
                      required
                      id="city-name"
                      name="name"
                      label={Translations.MiastaForm.Nazwa}
                      value={values.name}
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
  
  export default observer(CityForm);
  