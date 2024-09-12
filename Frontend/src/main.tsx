import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));
import Loading_Sphere from "./Components/Loading/Loading_Sphere";
// import Loading_Keyboard from "./Components/Loading/Loading_Keyboard";
// Routing
const router = createBrowserRouter([
  {
    path: "/",
    // element: <Loading_Keyboard />,
    // element: <Testing />,
    element: (
      <Suspense fallback={<Loading_Sphere />}>
        <App />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
