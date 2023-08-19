import React, { createContext } from "react";
import { baseUrl, postRequest } from "../utils/service";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState();
  const [registerError, setRegisterError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [registerInfo, setRegisterInfo] = React.useState({
    email: "",
    name: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });

  const updateRegisterInfo = React.useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = React.useCallback((info) => {
    setLoginInfo(info);
  }, []);

  React.useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const registerUser = React.useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setRegisterError(null);
      const res = await postRequest(
        `${baseUrl}/api/users/register`,
        JSON.stringify(registerInfo)
      );
      setLoading(false);

      if (res.error) {
        return setRegisterError(res);
      }

      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
    },
    [registerInfo]
  );

  const loginUser = React.useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setRegisterError(null);
      const res = await postRequest(
        `${baseUrl}/api/users/login`,
        JSON.stringify(loginInfo)
      );
      setLoading(false);

      if (res.error) {
        return setRegisterError(res);
      }

      localStorage.setItem("User", JSON.stringify(res));
      setUser(res);
    },
    [loginInfo]
  );

  const logoutUser = React.useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        loading,
        logoutUser,
        loginUser,
        updateLoginInfo,
        loginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
