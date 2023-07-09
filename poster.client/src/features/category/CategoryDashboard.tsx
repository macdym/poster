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
import { Category } from "../../app/models/category";
import { useStore } from "../../app/store/store";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import CategoryForm from "./CategoryForm";
import { Translations } from "../../app/common/translations";

const CategoryDashboard = () => {
  const { categoryStore } = useStore();
  const {
    loading,
    categories,
    loadingInitial,
    getAll: getCategories,
    delete: deleteCategory,
    openEditDialog,
  } = categoryStore;

  useEffect(() => {
    if (categories.length === 0) getCategories();
  }, [getCategories]);

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
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
        size: 700,
      },
    ],
    []
  );
  
  const sortedCategories = useMemo(() => {
    const sorted = [...categories];
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
  }, [categories]);

  const csvOptions = {
    fieldSeparator: ";",
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows: MRT_Row<Category>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(categories);
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
        data={sortedCategories}
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
                onClick={() => deleteCategory(parseInt(row.getValue("id")))}
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
      <CategoryForm />
    </Container>
  );
};

export default observer(CategoryDashboard);
