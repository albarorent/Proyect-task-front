import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-transparent bg-opacity-70 backdrop-filter backdrop-blur-sm max-w-md w-full rounded-lg p-2">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-slate-200">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(task._id);
            }}
            className="bg-red-800 text-slate-200 p-2 hover:text-white border-y-2 border-indigo-100 rounded-lg text-xs sm:text-base"
          >
            Eliminar
          </button>
          <Link to={`/tarea/${task._id}`} className="bg-sky-900 text-slate-200 p-2 hover:text-white border-y-2 border-indigo-100 rounded-lg text-xs sm:text-base">
            Editar
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;
