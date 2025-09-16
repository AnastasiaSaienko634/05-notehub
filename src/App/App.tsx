import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../services/noteService";

const App = () => {
  const [isMOdalOpen, setIsModalOpen] = useState(false);
  //function Open and close modal

  const { error, data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
};

export default App;
