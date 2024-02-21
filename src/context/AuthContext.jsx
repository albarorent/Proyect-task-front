import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, updateUserRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

//Provider:componente que engloba a otros

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth must be used within an AuthProvider");
  }
  return context;
};

//Provider para que se maneje en toda la aplicacion para verificar si tenemos un usuario autenticado
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setisAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setisAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("token");
      setisAuthenticated(false);
      setUser(null);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const updateUser = async(user) => {
    try {
      const res = await updateUserRequest(user);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      //Si no existe ningun token
      if (!cookies.token) {
        setisAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        //si existe y verifica que se ha creado
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setisAuthenticated(false);
          setLoading(false);
          return;
        }

        setisAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setisAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, loading, user, isAuthenticated, errors,updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
