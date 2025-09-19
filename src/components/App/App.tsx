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
import { Toaster } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const onOpen = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const { error, data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  const debouncedChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 1000);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" />

      <header className={css.toolbar}>
        <SearchBox debouncedChange={debouncedChange} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={data.totalPages}
          />
        )}
        <button className={css.button} onClick={onOpen}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader isLoading={isLoading} />}
      {error && <ErrorMessage />}
      {data && data?.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
    </div>
  );
};

export default App;
