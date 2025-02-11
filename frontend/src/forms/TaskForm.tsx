import { TextField } from "@mui/material";
import { useField } from "formik";

const TaskForm = () => {
  const [titleField, titleMeta] = useField("title");
  const [descriptionField, descriptionMeta] = useField("description");

  return (
    <>
      <TextField
        {...titleField}
        label="Título"
        error={Boolean(titleMeta.touched && titleMeta.error)}
        helperText={titleMeta.touched && titleMeta.error ? titleMeta.error : ""}
        required
        fullWidth
      />
      <TextField
        {...descriptionField}
        label="Descripción"
        error={Boolean(descriptionMeta.touched && descriptionMeta.error)}
        helperText={
          descriptionMeta.touched && descriptionMeta.error
            ? descriptionMeta.error
            : ""
        }
        multiline={true}
        rows={5}
        required
        fullWidth
      />
    </>
  );
};

export default TaskForm;
