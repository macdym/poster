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
import { Category } from "../../app/models/category";

const CategoryForm = () => {
  const { categoriesStore } = useStore();
  const { editMode, category, closeEditDialog, submitForm: submitCategoryForm } =
    categoriesStore;

  const handleSubmit = (category: Category) => {
    submitCategoryForm(category);
  };

  return (
    <Dialog open={editMode} maxWidth="lg">
      <Formik
        initialValues={{
          id: category?.id || undefined,
          name: category?.name || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form>
            <DialogTitle textAlign="center">
              {category
                ? Translations.KategoriaForm.TitleEdit
                : Translations.KategoriaForm.TitleCreate}
            </DialogTitle>
            <DialogContent>
              <div>
                <FormControl fullWidth sx={{ m: 2, width: 600 }}>
                  <TextField
                    color="secondary"
                    required
                    id="category-name"
                    name="name"
                    label={Translations.KategoriaForm.Nazwa}
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

export default observer(CategoryForm);
