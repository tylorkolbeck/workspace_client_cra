import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../../store/actions/user";
import { login, register } from "../auth-api";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const user = useSelector(({ user }) => user);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _navigateToRoot = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    console.log(user);
    if (user?.sessionTimeout) {
      console.log("LOGIN AGAIN YOU DUMMY");
    }
  }, [user.sessionTimeout]);

  useEffect(() => {
    const localUserData = localStorage.getItem("user");

    if (user && user.id) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", `${user.accessToken}`);
      return;
    }

    if (!user && !localUserData) {
      _navigateToRoot();
    }

    if (localUserData) {
      const userData = JSON.parse(localUserData);
      dispatch(setUser(userData));
    }

    setCheckingAuth(false);
    setAuthError(false);
  }, [user, _navigateToRoot, dispatch, navigate]);

  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    setAuthError(false);
  }

  function loginHandler(credentials, navigateToAfterLogin) {
    return login(credentials).then(({ success, data }) => {
      if (success && data.id) {
        localStorage.setItem("user", JSON.stringify(data));
        setAuthError(false);

        dispatch(setUser(data));
        navigate(navigateToAfterLogin);
      } else {
        setAuthError(data);
        setCheckingAuth(false);
      }
    });
  }

  function routeToLogin() {
    setAuthError(false);
    navigate("/login");
  }

  function registerHandler(userData) {
    return register(userData).then(({ success, data }) => {
      if (success) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          error: data,
        };
      }
    });
  }

  return {
    user,
    login: loginHandler,
    logout: logoutHandler,
    authError,
    loading: checkingAuth,
    routeToLogin,
    register: registerHandler,
  };
}

export default useAuth;
