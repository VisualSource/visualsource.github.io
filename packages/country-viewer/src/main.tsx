import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";

import AppLayout from "./layouts/App";
import Home from "./pages/Home";
import ViewCountry from "./pages/ViewCountry";

const client = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="view/:id" element={<ViewCountry />} />
    </Route>,
  ),
  { basename: import.meta.env.BASE_URL },
);

const theme = localStorage.getItem("county-viewer-theme") ?? "system";

const darkmode = window.matchMedia("(prefers-color-scheme: dark)");

darkmode.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

window.addEventListener("DOMContentLoaded", () => {
  switch (theme) {
    case "system":
      if (darkmode.matches) {
        document.body.classList.add("dark");
      }
      break;
    case "dark":
      document.body.classList.add("dark");
      break;
    default:
      break;
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
