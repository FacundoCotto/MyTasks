import { FaTrash } from "react-icons/fa6";
import { type UpdateTask } from "../types/tasks.types";

function TasksDetails({
  task,
  setIsDeleteModalOpen,
}: {
  task: UpdateTask | null;
  setIsDeleteModalOpen: (open: boolean) => void;
}) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{task?.title}</h1>
          <div className="mt-2 flex gap-2">
            {task?.priority?.map((p) => (
              <span
                key={p}
                className={`px-2 py-1 text-xs rounded-full ${
                  p === "high"
                    ? "bg-red-100 text-red-800"
                    : p === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {p}
              </span>
            ))}
            {task?.subject?.map((s) => (
              <span
                key={s}
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          <FaTrash size={20} />
        </button>
      </div>

      <div className="prose max-w-none mb-8">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{task?.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Due Date</h3>
          <p>
            {task?.dueDate
              ? new Date(task.dueDate).toLocaleString()
              : "No date"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500">Status</h3>
          <p
            className={
              task?.completed
                ? "text-green-600 font-bold"
                : "text-yellow-600 font-bold"
            }
          >
            {task?.completed ? "Completed" : "Pending"}
          </p>
        </div>
      </div>
    </>
  );
}

export default TasksDetails;
