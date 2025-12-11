import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { Btn } from "../../../ui/components/Btn";
import FilterTasks from "../components/FilterTasks";
import { priorityOptions, subjectOptions } from "../constants/tasks.constants";

function TasksPage() {
  const navigate = useNavigate();
  const { tasks, loading, filters, setFilters } = useTasks();

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleStatusChange = (val: string) => {
    let completedVal: boolean | string = "all";
    if (val === "completed") completedVal = true;
    if (val === "pending") completedVal = false;
    updateFilter("completed", completedVal);
  };

  const currentStatusValue =
    filters.completed === "all"
      ? "all"
      : filters.completed
      ? "completed"
      : "pending";

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-violet-800 italic">
          Your Tasks
        </h2>
        <Btn
          onClick={() => navigate("/mytasks/create-task")}
          variant="tasks_primary"
          className="px-6! py-2! flex!"
        >
          Create Task
        </Btn>
      </div>

      <FilterTasks
        filters={filters}
        updateFilter={updateFilter}
        handleStatusChange={handleStatusChange}
        setFilters={setFilters}
        priorityOptions={priorityOptions}
        subjectOptions={subjectOptions}
        currentStatusValue={currentStatusValue}
      />

      {loading ? (
        <div className="text-center text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">
            No tasks found matching your filters.
          </p>
          <button
            onClick={() =>
              setFilters({
                search: "",
                priority: [],
                subject: [],
                completed: "all",
              })
            }
            className="mt-2 text-violet-600 hover:text-violet-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => {
                navigate(`/mytasks/${task.id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;
