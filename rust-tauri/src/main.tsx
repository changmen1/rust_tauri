import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import router from "./router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <App /> */}
        <RouterProvider router={router} />
      </Suspense>
    </SnackbarProvider>
  </React.StrictMode>
);
