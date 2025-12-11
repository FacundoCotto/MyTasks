import { useNavigate } from "react-router-dom";
import { CreatePageForm } from "../components/CreatePageForm";
import { useTasks } from "../hooks/useTasks";
import type { CreateTask } from "../types/tasks.types";

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const { createTask } = useTasks();

  const handleCreateTask = async (data: CreateTask) => {
    try {
      await createTask(data);
      navigate("/mytasks");
    } catch (error: any) {
      console.error("Failed to create task", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert(
          `Failed to create task: ${
            error.response.data.message || error.message
          }`
        );
      } else {
        alert(`Failed to create task: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4">
      <CreatePageForm onSubmit={handleCreateTask} />
    </div>
  );
}
