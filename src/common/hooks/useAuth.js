import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../../store/actions/user";
import { login, register } from "../auth-api";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const userInfo = useSelector(({ user }) => user);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(">>>", userInfo);

  const _navigateToRoot = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // useEffect(() => {
  //   const localUserData = localStorage.getItem("user");

  //   if (userInfo && userInfo.id) {
  //     localStorage.setItem("user", JSON.stringify(userInfo));
  //     localStorage.setItem("token", `${userInfo.accessToken}`);
  //     return;
  //   }

  //   if (!userInfo && !localUserData) {
  //     _navigateToRoot();
  //   }

  //   if (localUserData) {
  //     const userData = JSON.parse(localUserData);
  //     dispatch(setUser(userData));
  //   }

  //   setCheckingAuth(false);
  //   setAuthError(false);
  // }, [userInfo, _navigateToRoot, dispatch, navigate]);

  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    setAuthError(false);
  }

  function loginHandler(credentials, navigateToAfterLogin) {
    return login(credentials).then((res) => {
      console.log("RESPONSE: ", res);

      // if (success && data) {
      //   const { jwt, user } = data;
      //   console.log(data);
      //   console.log(jwt, user);
      //   localStorage.setItem("user", JSON.stringify(user));
      //   localStorage.setItem("token", jwt);

      //   setAuthError(false);
      //   dispatch(setUser(data));
      //   navigate(navigateToAfterLogin);
      // } else {
      //   setAuthError(data);
      //   setCheckingAuth(false);
      // }
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

  function isLoggedInHandler() {
    if (userInfo.user) {
      return true;
    } else {
      return false;
    }
  }

  return {
    user: userInfo,
    login: loginHandler,
    logout: logoutHandler,
    authError,
    loading: checkingAuth,
    routeToLogin,
    register: registerHandler,
    isLoggedIn: isLoggedInHandler,
  };
}

export default useAuth;
