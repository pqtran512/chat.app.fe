import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//layouts

const UnAuth = Loader(lazy(() => import("src/layouts/un-auth")));

const Auth = Loader(lazy(() => import("src/layouts/auth")));

//Auth

const Login = Loader(lazy(() => import("src/pages/Auth/Login")));

const ForgotPassword = Loader(
  lazy(() => import("src/pages/Auth/ForgotPassword"))
);

const Register = Loader(lazy(() => import("src/pages/Auth/Register")));

//Home

const Home = Loader(lazy(() => import("src/pages/Home")));

const Contact = Loader(lazy(() => import("src/pages/Home/Contact")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Auth />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "",
    element: <UnAuth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
