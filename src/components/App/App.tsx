import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

const App = () => {
  const [isMOdalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);
  //function Open and close modal

  const { error, data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <header className={css.toolbar}>
        <SearchBox />
        {/* Пагінація */}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>
      {data && <NoteList />}
      {isMOdalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default App;
