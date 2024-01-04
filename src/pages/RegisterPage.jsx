import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Registerpage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigation = useNavigate();
  //Redirigue si un usuario esta autenticado a las tareas
  useEffect(() => {
    if (isAuthenticated) navigation("/tareas");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-200 max-w-md w-full  p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label
            className="w-full text-2xl font-medium text-black flex flex-col items-center"
            htmlFor=""
          >
            Register
          </label>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && <p className="text-red-500">Username required</p>}
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">Email required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
          />
          {errors.password && <p className="text-red-500">Password required</p>}
          <button
            type="submit"
            className="bg-sky-900 text-white px-4 py-2 rounded-md my-2"
          >
            Registrar Datos
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registerpage;
