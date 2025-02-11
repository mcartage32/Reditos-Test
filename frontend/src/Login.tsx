import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import UserForm from "./forms/UserForm";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./api/ApiHooks";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const { mutateAsync: LoginUser } = useLoginUserMutation();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
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
                username: values?.email,
                password: values?.password,
              },
              {
                onError: (_error) => {
                  return toast.error("Email o contraseña incorrectos.");
                },
              }
            );
            if (response?.success) {
              const data = await response?.user;
              if (data?.id) {
                auth?.login(data?.id.toString());
              } else {
                toast.error("ID de usuario no encontrado.");
              }
              navigate(`user/${data?.id}/tasks`);
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
