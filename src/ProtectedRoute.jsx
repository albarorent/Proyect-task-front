import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useTasks } from "./context/TaskContext";

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();
  const {loadingTask} = useTasks();
  //replace no vuelve a la ruta anterior
  if(loading) return <h1 className="text-white">Loading....</h1>
  if(loadingTask) return <h1 className="text-white">Loading....</h1>
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
