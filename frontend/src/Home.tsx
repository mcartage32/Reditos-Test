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
  TextField,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useContext, useEffect } from "react";
import {
  useDeleteTaskMutation,
  useTaskListQuery,
  useStatusListQuery,
  usePropietyListQuery,
} from "./api/ApiHooks";
import { AuthContext } from "./context/AuthContext";

function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutateAsync: deleteTask } = useDeleteTaskMutation();
  const { data: taskList, isLoading, refetch } = useTaskListQuery();
  const { data: statusList, isLoading: isLoadingStatus } = useStatusListQuery();
  const { data: priorityList, isLoading: isLoadingPriority } =
    usePropietyListQuery();

  // Estados para los filtros
  const [selectedStatus, setSelectedStatus] = useState<{
    id: number | null;
    name: string;
  } | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<{
    id: number | null;
    name: string;
  } | null>(null);
  const [filteredTasks, setFilteredTasks] = useState(taskList || []);

  useEffect(() => {
    if (!taskList) return;
    let filtered = taskList;
    if (selectedStatus && selectedStatus.id !== null) {
      filtered = filtered.filter(
        (task) => task.status?.id === selectedStatus.id
      );
    }
    if (selectedPriority && selectedPriority.id !== null) {
      filtered = filtered.filter(
        (task) => task.priority?.id === selectedPriority.id
      );
    }
    setFilteredTasks(filtered);
  }, [selectedStatus, selectedPriority, taskList]);

  const columns = [
    "Título",
    "Descripción",
    "Fecha de vencimiento",
    "Estado",
    "Prioridad",
    "Opciones",
  ];

  if (isLoading || isLoadingPriority || isLoadingStatus)
    return <CircularProgress />;

  return (
    <>
      <h2>Tareas</h2>
      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: "3vh", justifyContent: "center" }}
      >
        <Button variant="contained" onClick={() => navigate("../../create")}>
          Agregar
        </Button>
        <Button variant="outlined" onClick={auth?.logout}>
          Cerrar sesión
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: "5vh", justifyContent: "center" }}
      >
        <Autocomplete
          sx={{ width: 250 }}
          options={statusList || []}
          getOptionLabel={(option) => option?.name || ""}
          value={selectedStatus}
          onChange={(_, value) => setSelectedStatus(value)}
          loading={isLoadingStatus}
          renderInput={(params) => (
            <TextField {...params} label="Filtrar por Estado" />
          )}
        />

        <Autocomplete
          sx={{ width: 250 }}
          options={priorityList || []}
          getOptionLabel={(option) => option?.name || ""}
          value={selectedPriority}
          onChange={(_, value) => setSelectedPriority(value)}
          loading={isLoadingPriority}
          renderInput={(params) => (
            <TextField {...params} label="Filtrar por Prioridad" />
          )}
        />
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
            {filteredTasks.map((task) => (
              <TableRow
                key={task?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>{task?.dueDate}</TableCell>
                <TableCell>{task?.status?.name}</TableCell>
                <TableCell>{task?.priority?.name}</TableCell>
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
