import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ProfilePage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const {user,updateUser} = useAuth();
  
  useEffect(() => {
      function loadUser (){
        setValue("id",user.id);
        setValue("username",user.username);
        setValue("email",user.email);
      }
      loadUser();
  }, [])
  

  const onSubmit = handleSubmit(async (values) => {
    updateUser(values);
  });
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-200 max-w-md w-full  p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label
            className="w-full text-2xl font-medium text-black flex flex-col items-center"
            htmlFor=""
          >
            Mi perfil
          </label>
          <input type="hidden" {...register("id")} />
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
            Actualizar Datos
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
