import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
function TaskPage() {
  const { GetTasks, task } = useTasks();

  useEffect(() => {
    GetTasks();
  }, []);

  if(task.length === 0) return (<h1 className="text-white">No tiene ninguna tarea</h1>)
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 overflow-auto">
      {task.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  );
}

export default TaskPage;
