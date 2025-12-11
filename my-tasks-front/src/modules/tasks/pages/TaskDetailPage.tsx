import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { EditPageForm } from "../components/EditPageForm";
import { useTasks } from "../hooks/useTasks";
import type { UpdateTask } from "../types/tasks.types";
import { ConfirmModal } from "../../../ui/components/ConfirmModal";
import { Btn } from "../../../ui/components/Btn";
import TasksDetails from "../components/TasksDetails";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<UpdateTask | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { getTaskById, updateTask, deleteTask } = useTasks();

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      try {
        const data = await getTaskById(id);
        if (data) setTask(data);
      } catch (error) {
        console.error("Failed to fetch task", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, getTaskById]);

  const onConfirmDelete = async () => {
    try {
      if (id) await deleteTask(id);
      navigate("/mytasks");
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleUpdate = async (updatedTask: UpdateTask) => {
    try {
      await updateTask(updatedTask);
      setTask(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!task) return <div className="p-4">Task not found</div>;

  if (isEditing) {
    return (
      <div className="p-4">
        <Btn
          variant="tasks_secondary"
          onClick={() => setIsEditing(false)}
          className="mb-4 flex! items-center px-4! py-2! rounded-md! border-0 text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" /> Back to Detail
        </Btn>
        <EditPageForm initialValues={task} onSubmit={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10">
      <div className="flex gap-4 mb-4">
        <Btn
          variant="tasks_secondary"
          onClick={() => navigate("/mytasks")}
          className="flex! items-center px-4! py-2! rounded-md! border-0 text-gray-600 hover:text-gray-900"
        >
          <FaArrowLeft className="mr-2" /> Back to Tasks
        </Btn>
        <Btn
          variant="tasks_secondary"
          onClick={() => navigate("/mytasks/calendar")}
          className="flex! items-center px-4! py-2! rounded-md! border-0 text-gray-600 hover:text-gray-900"
        >
          <FaCalendar className="mr-2" /> Back to Calendar
        </Btn>
      </div>

      <TasksDetails task={task} setIsDeleteModalOpen={setIsDeleteModalOpen} />

      <Btn
        onClick={() => setIsEditing(true)}
        variant="tasks_primary"
        className="w-full flex! justify-center"
      >
        Edit Task
      </Btn>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        isDanger={true}
      />
    </div>
  );
}
