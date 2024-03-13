import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';

import ViewCountry from './pages/ViewCountry';
import AppLayout from './layouts/App';
import Home from './pages/Home';

const client = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="view/:id" element={<ViewCountry />} />
    </Route>
  ), { basename: import.meta.env.BASE_URL }
);

const theme = localStorage.getItem("county-viewer-theme") ?? "system";

switch (theme) {
  case "system":
    if (window.matchMedia("(perfers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    }
    break;
  case "dark":
    document.body.classList.add("dark");
    break;
  default:
    break;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
