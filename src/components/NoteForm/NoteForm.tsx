import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

interface CreateNote {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTask: CreateNote) => createNote(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] }); //для того щоб нотатки обновились
      onClose();
      toast.success("You have successfully created a new note!");
    },
    onError: () => {},
  });

  const initialValues: CreateNote = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title is too long")
      .required("Title is required"),
    content: Yup.string().max(500, "Content is too long"),
    tag: Yup.string()
      .required("Tag is required")
      .oneOf(
        ["Todo", "Work", "Personal", "Meeting", "Shopping"],
        "Tag must be one of: Todo, Work, Personal, Meeting, Shopping"
      ),
  });

  const handleSubmit = (values: CreateNote) => {
    if (values) {
      mutation.mutate({
        title: values.title,
        content: values.content,
        tag: values.tag,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" className={css.error} component="span" />
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
          <ErrorMessage name="content" className={css.error} component="span" />
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
          <ErrorMessage name="tag" className={css.error} component="span" />
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
