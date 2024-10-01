import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Suspense, lazy } from "react";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));
const SignUp = lazy(() => import("./Pages/Authentication/SignUp"));
import Loading_Sphere from "./Components/Loading/Loading_Sphere";
import { Provider } from "react-redux";
import MainApp from "./Pages/Authentication/MainApp";
import AuthenticationStore from "./Store/MainStore";
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
  {
    path: "activate/:uid/:token/:identifier/",
    // element: <Loading_Keyboard />,
    // element: <Analysis />,
    // element: <Testing />,
    element: <Loading_Sphere />,
  },
  {
    path: "password/reset/confirm/:uid/:token/:identifier",
    // element: <Loading_Keyboard />,
    // element: <Analysis />,
    // element: <Testing />,
    element: <Loading_Sphere />,
  },
  {
    path: "Rapid-type/",
    // element: <Loading_Keyboard />,
    // element: <Analysis />,
    // element: <Testing />,
    element: <MainApp />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={AuthenticationStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
