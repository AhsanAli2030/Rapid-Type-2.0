import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));
const SignUp = lazy(() => import("./Pages/Authentication/SignUp"));
import Loading_Sphere from "./Components/Loading/Loading_Sphere";
// import Loading_Keyboard from "./Components/Loading/Loading_Keyboard";
// import Testing from "./Components/Testing/Testing";
// import Analysis from "./Components/Analysis_Section/Analysis";
// Routing

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Loading_Keyboard />,
    // element: <Analysis />,
    // element: <Testing />,
    element: (
      <Suspense fallback={<Loading_Sphere />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "/get-started",
    // element: <Loading_Keyboard />,
    // element: <Analysis />,
    // element: <Testing />,
    element: (
      <Suspense fallback={<Loading_Sphere />}>
        <SignUp />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
