import { Container } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Add, Delete, Edit, FileDownload } from "@mui/icons-material";
import { ExportToCsv } from "export-to-csv";
import { useStore } from "../../app/store/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Translations } from "../../app/common/translations";
import { Place } from "../../app/models/place";
import PlaceForm from "./PlaceForm";

const PlaceDashboard = () => {
  const { placeStore } = useStore();
  const {
    loading,
    places,
    loadingInitial,
    getAll: getPlaces,
    delete: deletePlace,
    openEditDialog,
  } = placeStore;

  useEffect(() => {
    if (places.length === 0) getPlaces();
  }, [places]);

  const sortedPlaces = useMemo(() => {
    const sorted = [...places];
    sorted.sort((a, b) => {
      if (a.id && b.id) {
        return b.id - a.id;
      } else if (a) {
        return -1;
      } else if (b) {
        return 1;
      } else {
        return 0;
      }
    });
    return sorted;
  }, [places]);

  const columns = useMemo<MRT_ColumnDef<Place>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 40,
      },
      {
        accessorKey: "name",
        header: "Nazwa",
      },
      {
        accessorKey: "street",
        header: "Ulica",
      },
      {
        accessorKey: "building",
        header: "Budynek",
      },
      {
        accessorKey: "city",
        header: "Miasto",
      },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ";",
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows: MRT_Row<Place>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(places);
  };

  if (loadingInitial) return <LoadingComponent />;

  return (
    <Container style={{ marginTop: "7em" }}>
      {loading && <LinearProgress color="secondary" />}
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={sortedPlaces}
        enableRowSelection
        enableColumnOrdering
        editingMode="modal"
        enableEditing
        positionToolbarAlertBanner="bottom"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title={Translations.Buttons.Edit}>
              <IconButton
                onClick={() => {
                  openEditDialog(row.original);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip
              arrow
              placement="right"
              title={Translations.Buttons.Delete}
            >
              <IconButton
                onClick={() => deletePlace(parseInt(row.getValue("id")))}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: "flex", gap: "1rem", p: "0.5rem", flexWrap: "wrap" }}
          >
            <Button
              color="secondary"
              onClick={handleExportData}
              startIcon={<FileDownload />}
              variant="outlined"
            >
              {Translations.TableButtons.ExportAll}
            </Button>
            <Button
              color="secondary"
              disabled={table.getRowModel().rows.length === 0}
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownload />}
              variant="outlined"
            >
              {Translations.TableButtons.ExportPage}
            </Button>
            <Button
              color="secondary"
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownload />}
              variant="outlined"
            >
              {Translations.TableButtons.ExportRow}
            </Button>

            <Button
              onClick={() => openEditDialog()}
              color="secondary"
              variant="contained"
              startIcon={<Add />}
            >
              {Translations.Buttons.Add}
            </Button>
          </Box>
        )}
      />
      {loading && <LinearProgress color="secondary" />}
      <PlaceForm />
    </Container>
  );
};

export default observer(PlaceDashboard);
