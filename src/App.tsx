import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages";
import Admin from "./pages/admin";
import User from "./pages/user";
import Lottery from "./pages/lottery";
import React from "react";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/lottery",
      element: <Lottery />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
