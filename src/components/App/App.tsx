import TaskForm from "../TaskForm/TaskForm";
import { Toaster } from "react-hot-toast";
import TaskSearch from "../TaskSearch/TaskSearch";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const App = () => {
  const [query, setQuery] = useState("");
  const handleDebouncedCallback = useDebouncedCallback(
    (value: string) => setQuery(value),
    1000
  );
  return (
    <div>
      <Toaster position="top-right" />
      <TaskForm />
      <TaskSearch handleDebouncedCallback={handleDebouncedCallback} />
    </div>
  );
};

export default App;
