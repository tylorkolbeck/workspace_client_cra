import React, { useEffect } from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar.component";
import useAuth from "../../common/hooks/useAuth";

export default function GlobalLayout({ children }) {
  const { user, routeToLogin } = useAuth();

  useEffect(() => {
    if (!user) {
      routeToLogin();
    }
  }, [user, routeToLogin]);

  return (
    <div>
      <TopNavbar />
      {children}
    </div>
  );
}
