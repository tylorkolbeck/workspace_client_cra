import React from "react";
import { useRoutes, Outlet } from "react-router-dom";

// View components
import LoginView from "./views/Login/Login.view";
import RegisterView from "./views/Register/Register.view";
import ActivateAccount from "./views/ActivateAccount/ActivateAccount.view";
import Workspaces from "./views/Workspaces/Workspaces.view";

// Layouts
import ProtectedGlobalLayout from "./Layouts/ProtectedGlobalLayout/ProtectedGlobalLayout.component";
import UnprotectedGlobalLayout from "./Layouts/UnprotectedGlobalLayout/UnprotectedGlobalLayout.component";

const useRouteObj = () => {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedGlobalLayout>
          <Outlet />
        </ProtectedGlobalLayout>
      ),
      exact: true,
      children: [
        {
          path: "workspaces",
          element: (
            <div>
              <Workspaces />
            </div>
          ),
        },
      ],
    },
    {
      path: "login",
      element: (
        <UnprotectedGlobalLayout>
          <LoginView />
        </UnprotectedGlobalLayout>
      ),
      exact: true,
    },
    {
      path: "register",
      element: (
        <UnprotectedGlobalLayout>
          <RegisterView />
        </UnprotectedGlobalLayout>
      ),
      exact: true,
    },
    {
      path: "activate/:confirmationCode",
      element: (
        <UnprotectedGlobalLayout>
          <ActivateAccount />
        </UnprotectedGlobalLayout>
      ),
      exact: true,
    },

    { path: "*", element: <h1>Route Not found</h1> },
  ]);

  return element;
};

export default useRouteObj;
