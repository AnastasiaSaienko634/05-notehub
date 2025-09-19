import css from "./TaskSearch.module.css";

interface TaskSearchProps {
  handleDebouncedCallback: (value: string) => void;
}

const TaskSearch = ({ handleDebouncedCallback }: TaskSearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      handleDebouncedCallback(e.target.value);
    }
  };
  return (
    <div className={css.searchContainer}>
      <input
        type="text"
        defaultValue=""
        onChange={handleChange}
        className={css.searchInput}
        placeholder="Search tasks..."
      />
    </div>
  );
};

export default TaskSearch;
