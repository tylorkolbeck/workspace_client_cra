import React from "react";
import styles from "./TopNavbar.module.scss";

// libraries
import clsx from "clsx";

// hooks
import useAuth from "../../common/hooks/useAuth";

export default function Navbar() {
  const { logout, routeToLogin } = useAuth();
  function onLogoutHandler() {
    logout();
    routeToLogin();
  }

  return (
    <nav
      className={clsx("navbar ", styles.Navbar)}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <div>
                <button className="button is-danger" onClick={onLogoutHandler}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
