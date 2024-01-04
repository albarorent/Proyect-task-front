import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Alert } from "../components/Alert";
dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { CreateTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          dayjs.utc(task.date, "DD/M/YYYY").format("YYYY-MM-DD")
        );
      }else{
        const fechaHoy = dayjs().format('YYYY-MM-DD');
        setValue(
          "date",
          dayjs.utc(fechaHoy, "DD/M/YYYY").format("YYYY-MM-DD")
        );
      }
    }
    loadTask();
  }, []);

 

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, { ...data, date: dayjs.utc(data.date).format() });
      Alert(params.id);
    } else {
      CreateTask({ ...data, date: dayjs.utc(data.date).format() });
      Alert();
    }
    navigate("/tareas");
    
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-slate-200 max-w-md w-full  p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label
            htmlFor=""
            className="w-full text-2xl font-medium text-black flex flex-col items-center"
          >
            Crear Tarea
          </label>
          <input
            type="text"
            placeholder="Titulo"
            {...register("title", { required: true })}
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
            autoFocus
          />
          {errors.title && <p className="text-red-500">Title required</p>}
          <textarea
            placeholder="Descripcion"
            rows="3"
            {...register("description", { required: true })}
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Description required</p>
          )}
          <input
            className="w-full bg-gray-200 border border-slate-900 text-black px-4 py-2 rounded-md my-2"
            type="date"
            {...register("date")}
            placeholder="Fecha"
          />
          <button className="bg-sky-900 text-white px-4 py-2 rounded-md my-2">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
