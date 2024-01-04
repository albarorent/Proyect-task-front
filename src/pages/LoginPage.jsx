import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: loginErros, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tareas");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-200 max-w-md w-full  p-10 rounded-md">
        {loginErros.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label
            className="w-full text-2xl font-medium text-black flex flex-col items-center"
            htmlFor=""
          >
            Login
          </label>
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
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{" "}
          <Link to="/registrar" className="text-sky-500">
            Registrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
