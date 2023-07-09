import { Container } from "@mui/material";
import React, { useMemo, useState, useEffect } from "react";
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Tooltip,
  LinearProgress,
  Checkbox,
  Avatar,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Add, FileDownload } from "@mui/icons-material";
import { ExportToCsv } from "export-to-csv";
import { useStore } from "../../../app/store/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Translations } from "../../../app/common/translations";
import { User } from "../../../app/models/user";
import RegisterForm from "../RegisterForm";
import { Link } from "react-router-dom";

const UsersDashboard = () => {
  const { userStore } = useStore();
  const {
    loading,
    users,
    loadingInitial,
    getAll: getUser,
    delete: deleteUser,
    openEditDialog,
  } = userStore;

  useEffect(() => {
    if (users.length === 0) getUser();
  }, [users]);
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "userName",
        header: "Nazwa użytkownika",
        Cell: ({ row }) => (
          <Link to={`/users/${row.original.userName}`}>
            {row.original.userName}
          </Link>
        ),
      },
      {
        accessorKey: "email",
        header: "E-mail",
      },
      {
        accessorKey: "isActive",
        header: "Aktywny",
        Cell: ({ row }) => (
          <Checkbox
            color="secondary"
            checked={row.original.isActive}
            disabled={row.original.role === "ADMIN"}
            onChange={() => {
              if (row.original.isActive) {
                userStore.deactivateProfile(row.original.userName, true);
              } else {
                userStore.activateProfile(row.original.userName);
              }
            }}
          />
        ),
      },
      {
        accessorKey: "role",
        header: "Rola",
        Cell: ({ row }) => (
          <Select
            color="secondary"
            value={row.original.role}
            onChange={(event) => {
              const newRole = event.target.value;
              userStore.udpateRole(row.original.userName, newRole);
            }}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        ),
      },
      {
        accessorKey: "displayName",
        header: "Nazwa wyświetlana",
        Cell: ({ row }) => (
          <div style={{ display: "flex" }}>
            <Avatar src={row.original.image} />
            <Typography style={{ marginTop: 10, marginLeft: 10 }}>
              {row.original.userName}
            </Typography>
          </div>
        ),
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

  const handleExportRows = (rows: MRT_Row<User>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(users);
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
        data={users.filter((user) => user.userName !== "Admin")}
        enableRowSelection
        enableColumnOrdering
        editingMode="modal"
        enableEditing
        positionToolbarAlertBanner="bottom"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip
              arrow
              placement="left"
              title="Resetowanie hasła użytkownika do wartośc domyślnej"
            >
              <Button
                color="secondary"
                onClick={() => userStore.resetPassword(row.original.userName)}
              >
                zresetuj hasło
              </Button>
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
              onClick={() => userStore.setRegisterFormOpen()}
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
      <RegisterForm
        isRegisterFormOpen={userStore.registerFormOpen}
        isManage={true}
      />
    </Container>
  );
};

export default observer(UsersDashboard);
