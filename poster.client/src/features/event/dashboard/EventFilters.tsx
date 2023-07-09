import * as React from "react";
import { Button, Paper, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  CancelOutlined,
  FilterAlt,
  Search,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { Translations } from "../../../app/common/translations";
import { Form, Formik } from "formik";
import { EventFilter } from "../../../app/models/eventFilter";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import moment from "moment";
import { TrustedHTML } from "trusted-types/lib";

const EventFilters = () => {
  const { eventStore } = useStore();
  const {
    getFiltered,
    eventFilter,
    getAll,
    setValueEnabled,
    setFromToEnabled,
    valueEnabled,
    fromToEnabled,
    setSorting,
    sorting,
  } = eventStore;

  const handleSubmit = (eventFilter: EventFilter) => {
    getFiltered(eventFilter);
  };

  return (
    <Formik
      initialValues={{
        field: eventFilter?.field || "",
        value: eventFilter?.value || "",
        filter: eventFilter?.filter || "all",
        active: eventFilter?.active ?? true,
        from:
        eventFilter !== null && eventFilter?.from
            ? moment(eventFilter?.from).format("YYYY-MM-DD")
            : "",
        to:
        eventFilter !== null && eventFilter?.to
            ? moment(eventFilter?.to).format("YYYY-MM-DD")
            : "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange }) => (
        <Form>
          <Paper sx={{ mb: 2 }}>
            <List sx={{ paddingTop: 0 }}>
              <ListItem
                sx={{
                  bgcolor: "#9c27b0",
                  color: "#fff",
                  height: 50,
                }}
              >
                <FilterAlt />
                <Typography>{Translations.AktywnosciFilters.Title}</Typography>
                <Button
                  color="inherit"
                  onClick={setSorting}
                  startIcon={!sorting ? <ArrowUpward /> : <ArrowDownward />}
                  sx={{ marginLeft: "auto" }}
                >
                  sortuj {!sorting ? "rosnąco" : "malejąco"}
                </Button>
              </ListItem>
              <ListItem sx={{ marginTop: 2 }}>
                <Checkbox
                  color="secondary"
                  value={valueEnabled}
                  checked={valueEnabled}
                  onChange={() => setValueEnabled(!valueEnabled)}
                />
                <FormControl fullWidth>
                  <InputLabel
                    id="event-filter-field-label"
                    color="secondary"
                  >
                    {Translations.AktywnosciFilters.Field}
                  </InputLabel>
                  <Select
                    disabled={!valueEnabled}
                    label={Translations.AktywnosciFilters.Field}
                    labelId="event-filter-field-label"
                    color="secondary"
                    value={values.field}
                    id="event-filter-field"
                    name="field"
                    onChange={handleChange}
                  >
                    <MenuItem key={"field-title"} value={"title"}>
                      {Translations.AktywnosciFilters.Tytul}
                    </MenuItem>
                    <MenuItem key={"field-vendor"} value={"vendor"}>
                      {Translations.AktywnosciFilters.Organizator}
                    </MenuItem>
                    <MenuItem key={"field-city"} value={"city"}>
                      {Translations.AktywnosciFilters.Miasto}
                    </MenuItem>
                    <MenuItem key={"field-place"} value={"place"}>
                      {Translations.AktywnosciFilters.Miejce}
                    </MenuItem>
                    <MenuItem key={"field-category"} value={"category"}>
                      {Translations.AktywnosciFilters.Kategoria}
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginLeft: 2 }}>
                  <TextField
                    required={valueEnabled}
                    label={Translations.AktywnosciFilters.Value}
                    disabled={values.field === "" || !valueEnabled}
                    color="secondary"
                    id="event-filter-value"
                    name="value"
                    value={values.value}
                    onChange={handleChange}
                  />
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem>
                <Checkbox
                  color="secondary"
                  value={fromToEnabled}
                  checked={fromToEnabled}
                  onChange={() => setFromToEnabled(!fromToEnabled)}
                />
                <FormControl fullWidth>
                  <TextField
                    disabled={!fromToEnabled}
                    color="secondary"
                    required={fromToEnabled}
                    type="date"
                    id="event-filter-from"
                    name="from"
                    label={Translations.AktywnosciFilters.From}
                    InputLabelProps={{ shrink: true }}
                    value={values.from}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginLeft: 2 }}>
                  <TextField
                    disabled={!fromToEnabled}
                    required={fromToEnabled}
                    color="secondary"
                    type="date"
                    id="event-filter-to"
                    name="to"
                    InputLabelProps={{ shrink: true }}
                    label={Translations.AktywnosciFilters.To}
                    value={values.to}
                    onChange={handleChange}
                  />
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem>
                <FormControl>
                  <RadioGroup row value={values.filter} name="filter">
                    <FormControlLabel
                      sx={{ marginLeft: 3 }}
                      control={
                        <Radio
                          color="secondary"
                          value="all"
                          onChange={handleChange}
                        />
                      }
                      label={Translations.AktywnosciFilters.All}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: 3 }}
                      control={
                        <Radio
                          color="secondary"
                          value="my"
                          onChange={handleChange}
                        />
                      }
                      label={Translations.AktywnosciFilters.My}
                    />
                    <FormControlLabel
                      sx={{ marginLeft: 3 }}
                      control={
                        <Radio
                          color="secondary"
                          value="joined"
                          onChange={handleChange}
                        />
                      }
                      label={Translations.AktywnosciFilters.Joined}
                    />
                  </RadioGroup>
                  <Divider />
                  <FormControlLabel
                    sx={{ marginLeft: 3 }}
                    control={
                      <Checkbox
                        color="secondary"
                        name="active"
                        value={values.active}
                        checked={values.active}
                        onChange={handleChange}
                      />
                    }
                    label={Translations.AktywnosciFilters.Active}
                  />
                </FormControl>
              </ListItem>
              <Divider />
              <ListItem>
                <Button
                  fullWidth
                  color="secondary"
                  type="submit"
                  startIcon={<Search />}
                >
                  {Translations.AktywnosciFilters.Find}
                </Button>
                <Button
                  fullWidth
                  color="secondary"
                  startIcon={<CancelOutlined />}
                  onClick={getAll}
                >
                  {Translations.AktywnosciFilters.Clear}
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default observer(EventFilters);
