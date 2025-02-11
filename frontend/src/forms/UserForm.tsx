import { TextField } from "@mui/material";
import { useField } from "formik";

interface UserFormProps {
  isRegister: boolean;
}

const UserForm = ({ isRegister }: UserFormProps) => {
  const [usernameField, usernameMeta] = useField("email");
  const [passwordField, passwordMeta] = useField("password");
  const [confirmPasswordField, confirmPasswordMeta] =
    useField("confirmPassword");

  return (
    <>
      <TextField
        {...usernameField}
        label="Email"
        error={Boolean(usernameMeta.touched && usernameMeta.error)}
        helperText={
          usernameMeta.touched && usernameMeta.error ? usernameMeta.error : ""
        }
        required
      />
      <TextField
        {...passwordField}
        label="Contraseña"
        type="password"
        error={Boolean(passwordMeta.touched && passwordMeta.error)}
        helperText={
          passwordMeta.touched && passwordMeta.error ? passwordMeta.error : ""
        }
        required
      />
      {isRegister && (
        <TextField
          {...confirmPasswordField}
          label="Confirmar contraseña"
          type="password"
          error={Boolean(
            confirmPasswordMeta.touched && confirmPasswordMeta.error
          )}
          helperText={
            confirmPasswordMeta.touched && confirmPasswordMeta.error
              ? confirmPasswordMeta.error
              : ""
          }
          required
        />
      )}
    </>
  );
};

export default UserForm;
