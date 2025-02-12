import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import UserForm from "./forms/UserForm";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./api/ApiHooks";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const { mutateAsync: LoginUser } = useLoginUserMutation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

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
        <Typography variant="h5">Login</Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values: any) => {
            const response = await LoginUser(
              {
                email: values?.email,
                password: values?.password,
              },
              {
                onError: (_error) => {
                  return toast.error("Email o contraseña incorrectos.");
                },
              }
            );
            if (response?.access_token) {
              auth?.login(response.access_token);
              queryClient.invalidateQueries();
              queryClient.clear(); // Limpiar caché al iniciar sesión
              navigate("tasks");
            } else {
              return toast.error("Email o contraseña incorrectos.");
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
            <UserForm isRegister={false} />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("registration")}
            >
              Registrarse
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
