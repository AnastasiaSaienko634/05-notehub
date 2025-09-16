import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import type { CreateNoteRequest } from "../../types/note";
import { Formik, Form, Field } from "formik";

interface NoteFormProps {
  onClose: () => void;
}

interface InitialValues {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: CreateNoteRequest) => createNote(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); //для того щоб нотатки обновились
    },
    onError: () => {},
  });

  const initialValues: InitialValues = {
    title: "",
    content: "",
    tag: "",
  };

  const handleSubmit = (values: InitialValues) => {
    if (values) {
      mutation.mutate({
        title: values.title,
        content: values.content,
        tag: values.tag,
      });
    }
  };

  return (
    //did it with Formik

    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          {/* <span name="title" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          {/* <span name="content" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          {/* <span name="tag" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
