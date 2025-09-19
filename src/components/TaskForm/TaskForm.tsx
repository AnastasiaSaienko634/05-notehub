import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createNewTask } from "../../services/TaskService";
import toast from "react-hot-toast";
import css from "./TaskFor.module.css";
import { useId } from "react";

interface CreateTask {
  title: string;
  description: string;
  status: string;
}

const TaskFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "title must be at least 2 characters")
    .max(30, "title is too long")
    .required("title is required"),
  description: Yup.string().required("description is required"),
  status: Yup.string()
    .required("description is required")
    .oneOf(
      ["Todo", "InProgress", "Done"],
      "Tag must be one of: Todo, Work, Personal, Meeting, Shopping"
    ),
});

const TaskForm = () => {
  const id = useId();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newTask: CreateTask) => createNewTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("You created new Task!");
    },
  });

  const initialValues: CreateTask = {
    title: "",
    description: "",
    status: "Todo",
  };

  const handleSubmit = (values: CreateTask) => {
    mutation.mutate(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TaskFormSchema}
    >
      <Form className={css.form}>
        <label htmlFor={`title-${id}`}>
          Title
          <Field name="title" id={`title-${id}`} className={css.field} />
        </label>
        <ErrorMessage name="title" component="span" className={css.error} />
        <label htmlFor={`description-${id}`}>
          Description
          <Field
            name="description"
            id={`description-${id}`}
            className={css.field}
          />
        </label>
        <ErrorMessage
          name="description"
          component="span"
          className={css.error}
        />
        <label htmlFor={`status-${id}`}>
          Status
          <Field
            as="select"
            name="status"
            id={`status-${id}`}
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </Field>
        </label>
        <ErrorMessage name="status" component="span" className={css.error} />

        <button
          type="submit"
          className={css.button}
          disabled={mutation.isPending}
        >
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default TaskForm;
