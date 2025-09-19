import css from "./SearchBox.module.css";

interface SearchBoxProps {
  debouncedChange: (value: string) => void;
}

const SearchBox = ({ debouncedChange }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        defaultValue=""
      />
    </>
  );
};

export default SearchBox;
