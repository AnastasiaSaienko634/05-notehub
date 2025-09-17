import css from "./SearchBox.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

interface SearchBoxProps {
  setQuery: (query: string) => void;
  query: string;
  setCurrentPage: (number: number) => void;
}

const SearchBox = ({ setQuery, query, setCurrentPage }: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState(query);
  const debouncedChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  });
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
