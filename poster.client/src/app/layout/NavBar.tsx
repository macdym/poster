import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Upcoming,
  Send,
  DynamicFeed,
  ArrowDropDown,
  Logout,
} from "@mui/icons-material";
import { Translations } from "../common/translations";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";
import nophoto from "../assets/nophoto.jpeg";

const NavBar = () => {
  const { aktywnoscStore, userStore } = useStore();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const isMenuOpen = Boolean(anchorEl);
  const isProfileOpen = Boolean(profileAnchorEl);

  const handleManageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseManage = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setProfileAnchorEl(null);
  };

  return (
    <>
      <AppBar color="secondary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link
              to={"/"}
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
              }}
            >
              <Upcoming sx={{ display: { fontSize: 28, md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                {Translations.AppTitle}
              </Typography>
            </Link>
            {userStore.isLoggedIn && (
              <>
                {userStore.user != null && userStore.user?.role === "ADMIN" &&
                  <Button
                    color="warning"
                    variant="outlined"
                    key="aktywnosci"
                    sx={{ my: 2, mx: 1, color: "white", borderColor: "white" }}
                    onClick={handleManageClick}
                    startIcon={<ArrowDropDown />}
                  >
                    {Translations.NavBar.Zarzadzaj}
                  </Button>
                }
                <Menu
                  key="manage-menu"
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleCloseManage}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <Link
                    to={"/manage-users"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseManage}>
                      {Translations.NavBar.Uzytkownicy}
                    </MenuItem>
                  </Link>
                  <Link
                    to={"/city"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseManage}>
                      {Translations.NavBar.Miasta}
                    </MenuItem>
                  </Link>
                  <Link
                    to={"/place"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseManage}>
                      {Translations.NavBar.Miejsca}
                    </MenuItem>
                  </Link>
                  <Link
                    to={"/category"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseManage}>
                      {Translations.NavBar.Kategorie}
                    </MenuItem>
                  </Link>
                </Menu>

                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  <Button
                    color="warning"
                    variant="outlined"
                    href="/event"
                    sx={{
                      my: 2,
                      mx: 1,
                      color: "white",
                      borderColor: "white",
                    }}
                    startIcon={<DynamicFeed />}
                  >
                    {Translations.NavBar.Aktywnosci}
                  </Button>
                  <Button
                    disabled={
                      aktywnoscStore.editMode ||
                      location.pathname !== "/event"
                    }
                    variant="outlined"
                    key={"Postuj"}
                    color="warning"
                    sx={{
                      my: 2,
                      mx: 1,
                      color: "white",
                      borderColor: "white",
                    }}
                    startIcon={<Send />}
                    href="/createEvent"
                  >
                    {Translations.NavBar.AddPost}
                  </Button>
                </Box>

                <IconButton
                  color="inherit"
                  onClick={handleProfileClick}
                  sx={{ ml: 2 }}
                >
                  <>
                    <Avatar sx={{ width: 32, height: 32, marginRight: 1 }} src={userStore.user?.image ?? nophoto} />
                    <Typography variant="h6">
                      {userStore.user?.userName}
                    </Typography>
                    <ArrowDropDown />
                  </>
                </IconButton>

                <Menu
                  key="account-menu"
                  anchorEl={profileAnchorEl}
                  open={isProfileOpen}
                  onClose={handleCloseProfile}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                >
                  <Link
                    to={`/users/${userStore.user?.userName}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleCloseProfile}>
                      <Avatar src={userStore.user?.image ?? nophoto}/> Mój profil
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={userStore.logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Wyloguj
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default observer(NavBar);
