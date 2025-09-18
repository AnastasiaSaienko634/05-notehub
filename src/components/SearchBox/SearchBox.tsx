import css from "./SearchBox.module.css";
import { useState } from "react";

interface SearchBoxProps {
  query: string;
  debouncedChange: (value: string) => void;
}

const SearchBox = ({ query, debouncedChange }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState(query);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      return;
    }
    debouncedChange(event.target.value);
  };

  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={handleChange}
        value={inputValue}
      />
    </>
  );
};

export default SearchBox;
