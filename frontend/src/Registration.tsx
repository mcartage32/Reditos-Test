import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import UserForm from "./forms/UserForm";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "./api/ApiHooks";
import { toast } from "react-toastify";

const Registration = () => {
  const { mutateAsync: createUser } = useCreateUserMutation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: 300,
        }}
      >
        <Typography variant="h5">Registro</Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (values: any) => {
            if (values?.password !== values?.confirmPassword) {
              return toast.error("Las contraseñas deben ser iguales");
            } else {
              await createUser(
                { username: values?.email, password: values?.password },
                {
                  onSuccess: () => {
                    toast.success("Se ha registrado el usuario correctamente.");
                    navigate(-1);
                  },
                  onError: (_error) => {
                    return toast.error("Error al registar el usuario.");
                  },
                }
              );
            }
          }}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "100%",
            }}
          >
            <UserForm isRegister={true} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Registrar
            </Button>
            <Button variant="outlined" fullWidth onClick={() => navigate(-1)}>
              Volver
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Registration;
