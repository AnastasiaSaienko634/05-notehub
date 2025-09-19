import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface ResponseTasks {
  tasks: Task[];
}

interface CreateTask {
  title: string;
  description: string;
  status: string;
}

interface ResponseCreateTask {
  task: Task;
}

interface ResponseDeleteTask {
  task: Task;
}

export const fetchTasks = async (
  page: number,
  query: string
): Promise<Task[]> => {
  const response = await axios.get<ResponseTasks>(
    "https://jsonplaceholder.typicode.com/todos",
    {
      params: {
        page: page,
        query: query,
      },
    }
  );
  return response.data.tasks;
};

export const createNewTask = async (newTask: CreateTask): Promise<Task> => {
  const reponse = await axios.post<ResponseCreateTask>(
    "https://jsonplaceholder.typicode.com/todos",
    newTask
  );
  return reponse.data.task;
};

export const deleteTask = async (id: number): Promise<Task> => {
  const reponse = await axios.delete<ResponseDeleteTask>(`/tasks/${id}`);
  return reponse.data.task;
};
