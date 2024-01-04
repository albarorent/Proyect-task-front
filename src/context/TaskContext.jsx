import { createContext, useContext, useEffect, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [task, setTask] = useState([]);
  const [loadingTask, setLoadingTask] = useState(true);

  const GetTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CreateTask = async (task) => {
    try {
      setLoadingTask(true);
      const res = await createTaskRequest(task);
      setLoadingTask(false);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      setLoadingTask(true);
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTask(task.filter((task) => task._id !== id));
      setLoadingTask(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id,task) => {
    try {
      setLoadingTask(true);
      const res = await updateTaskRequest(id,task);
      setLoadingTask(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function Loading() {
      setLoadingTask(false);
    }
    Loading();
  }, [])
  

  return (
    <TaskContext.Provider
      value={{ task, CreateTask, GetTasks, deleteTask, getTask,updateTask,loadingTask}}
    >
      {children}
    </TaskContext.Provider>
  );
}
