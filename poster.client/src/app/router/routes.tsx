import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/homePage/HomePage";
import AktywnosciDashboard from "../../features/event/dashboard/EventDashboard";
import CategoryDashboard from "../../features/category/CategoryDashboard";
import CityDashboard from "../../features/city/CityDashboard";
import PlaceDashboard from "../../features/place/PlaceDashboard";
import EventDashboard from "../../features/event/details/EventDashboard";
import AktywnoscForm from "../../features/event/form/EventForm";
import NotFound from "../../features/errors/NotFound";
import UsersDashboard from "../../features/users/dashboard/UsersDashboard";
import Forbidden from "../../features/errors/Forbidden";
import ProtectedRoute from "./protectedRoute";
import ProfilePage from "../../features/users/profile/ProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "event", element: <EventDashboard /> },
      { path: "event/:id", element: <EventDashboard /> },
      {
        path: "createEvent",
        element: <EventForm key={"createEvent"} />,
      },
      {
        path: "editEvent/:id",
        element: <EventForm key={"editEvent"} />,
      },
      {
        path: "category",
        element: (
          <ProtectedRoute>
            <CategoryDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <ProtectedRoute>
            <UsersDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "users/:username",
        element: <ProfilePage />,
      },
      {
        path: "city",
        element: (
          <ProtectedRoute>
            <CityDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "place",
        element: (
          <ProtectedRoute>
            <PlaceDashboard />
          </ProtectedRoute>
        ),
      },
      { path: "not-found", element: <NotFound /> },
      { path: "forbidden", element: <Forbidden /> },
      { path: "*", element: <Navigate replace to="not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
