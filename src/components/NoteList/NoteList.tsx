import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

const NoteList = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleClick = (noteId: string) => {
    mutation.mutate(noteId);
  };
  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотаток */}
      <li className={css.listItem}>
        <h2 className={css.title}>Note title</h2>
        <p className={css.content}>Note content</p>
        <div className={css.footer}>
          <span className={css.tag}>Note tag</span>
          <button className={css.button} onClick={() => handleClick(note.id)}>
            Delete
          </button>
        </div>
      </li>
    </ul>
  );
};

export default NoteList;
