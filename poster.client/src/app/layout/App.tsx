import { Container } from "@mui/material";
import NavBar from "./NavBar";
import "react-toastify/dist/ReactToastify.min.css";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomePage from "../../features/homePage/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../store/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { pathname } = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent />;

  return (
    <>
      <ToastContainer position="bottom-left" hideProgressBar theme="colored" />
      {pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "6em" }} maxWidth="xl">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
