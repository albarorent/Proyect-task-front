import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-sm py-5 px-10 rounded-lg grid sm:grid-cols-2">
      {isAuthenticated ? (
        <Link to="/tareas">
          <h1 className="text-slate-200 p-2 hover:text-white font-bold text-center sm:text-left">
            Tasks Manager
          </h1>
        </Link>
      ) : (
        <>
          <Link to="/">
            <h1 className="text-slate-200 hover:text-white font-bold text-center sm:text-left">
              Welcome User
            </h1>
          </Link>
        </>
      )}

      <ul className="flex gap-8 justify-center sm:justify-end">
        {isAuthenticated ? (
          <>
            <li className="text-slate-200 p-2 hover:text-white border-y-2 text-center border-indigo-100 rounded-lg text-xs sm:text-sm">
              <Link to="/perfil">Welcome {user.username}</Link>
            </li>
            <li className="text-slate-200 p-2 hover:text-white border-y-2 text-center border-indigo-100 rounded-lg text-xs sm:text-sm">
              <Link to="/agregar">Agregar</Link>
            </li>
            <li className="text-slate-200 p-2 hover:text-white border-y-2 text-center border-indigo-100 rounded-lg text-xs sm:text-sm">
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-slate-200 p-2 hover:text-white border-y-2 text-center border-indigo-100 rounded-lg text-xs sm:text-sm">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-slate-200 p-2 hover:text-white border-y-2 text-center border-indigo-100 rounded-lg text-xs sm:text-sm">
              <Link to="/registrar">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
