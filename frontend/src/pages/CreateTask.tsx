import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import TaskForm from "../forms/TaskForm";
import { useCreateTaskMutation } from "../api/ApiHooks";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const CreateTask = () => {
  const auth = useContext(AuthContext);
  const { mutateAsync: createTask } = useCreateTaskMutation();
  const navigate = useNavigate();

  if (!auth) {
    return (
      <Typography variant="h6">
        No estás autenticado. Por favor, inicia sesión.
      </Typography>
    );
  }
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
        <Typography variant="h5">Crear Tarea</Typography>
        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          onSubmit={async (values: any) => {
            await createTask(
              {
                description: values?.description,
                title: values?.title,
                userId: Number(auth?.userId),
              },
              {
                onSuccess: () => {
                  toast.success("Tarea agregada correctamente");
                  navigate(-1);
                },
                onError: (_error) => {
                  return toast.error("Error al crear la tarea");
                },
              }
            );
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
            <TaskForm />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Agregar
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
              Volver
            </Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateTask;
