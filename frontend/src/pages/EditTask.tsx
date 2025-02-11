import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../forms/TaskForm";
import { useTaskDetailQuery, useUpdateTaskMutation } from "../api/ApiHooks";
import { updatedDiff } from "deep-object-diff";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

const EditTask = () => {
  const { taskId } = useParams();
  const { data: taskDetail, isLoading } = useTaskDetailQuery(Number(taskId));
  const { mutateAsync: updateTask } = useUpdateTaskMutation();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
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
        <Typography variant="h5">Editar Tarea</Typography>
        <Formik
          enableReinitialize
          initialValues={taskDetail}
          onSubmit={async (values: any) => {
            if (!taskDetail) {
              return toast.error("No se encontro la nota");
            }
            const differences = updatedDiff(taskDetail, values);

            if (isEmpty(differences)) {
              return toast.info("No actualizo ningún campo.");
            } else {
              await updateTask(
                { sendData: differences, taskId: Number(taskId) },
                {
                  onSuccess: () => {
                    return toast.success(
                      "Se actualizó la tarea correactamente"
                    );
                  },
                  onError: (_error) => {
                    return toast.error("Erro al actualizar la tarea.");
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
            <TaskForm />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Actualizar
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

export default EditTask;
