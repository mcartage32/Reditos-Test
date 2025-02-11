import "./styles/App.css";
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteTaskMutation, useTaskListQuery } from "./api/ApiHooks";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();
  const {
    data: taskList,
    isLoading: isLoading,
    refetch,
  } = useTaskListQuery(Number(userId));
  const columns = ["Título", "Contenido", "Opciones"];

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <h2>Tareas</h2>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: "8vh", justifyContent: "center" }}
      >
        <Button variant="contained" onClick={() => navigate("../../create")}>
          Agregar
        </Button>
        <Button variant="outlined" onClick={auth?.logout}>
          Cerrar sesión
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="dynamic table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
              {columns.map((column, columIndex) => (
                <TableCell key={columIndex}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList?.map((task) => (
              <TableRow
                key={task?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`../../edit/${task?.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() =>
                      deleteTask(
                        { taskId: Number(task?.id) },
                        {
                          onSuccess: () => {
                            refetch();
                            toast.success("Se eliminó la tarea correctamente.");
                          },
                          onError: (_error) => {
                            toast.error("Error al eliminar la tarea");
                          },
                        }
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Home;
