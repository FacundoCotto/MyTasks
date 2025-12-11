import { Input } from "../../../ui/components/Input";
import { MultiSelect } from "../../../ui/components/MultiSelect";
import { type FilterTasksProps } from "../types/tasks.types";

function FilterTasks({
  filters,
  updateFilter,
  handleStatusChange,
  setFilters,
  priorityOptions,
  subjectOptions,
  currentStatusValue,
}: FilterTasksProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-4 md:space-y-0 md:flex md:gap-4 flex-wrap">
      <div className="flex-1 min-w-[200px]">
        <Input
          type="text"
          placeholder="Search title or description..."
          value={filters.search || ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          variant="tasks_primary"
          className="py-2!"
        />
      </div>

      <div className="min-w-[150px]">
        <select
          className="w-full border border-gray-300 rounded-md p-2 focus:border-violet-500 focus:outline-none h-[42px]"
          value={currentStatusValue}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="min-w-[150px]">
        <MultiSelect
          placeholder="Priority"
          options={priorityOptions}
          value={filters.priority || []}
          onChange={(val) => updateFilter("priority", val)}
        />
      </div>

      <div className="min-w-[150px]">
        <MultiSelect
          placeholder="Subject"
          options={subjectOptions}
          value={filters.subject || []}
          onChange={(val) => updateFilter("subject", val)}
        />
      </div>

      {(filters.priority?.length! > 0 ||
        filters.subject?.length! > 0 ||
        filters.search ||
        filters.completed !== "all") && (
        <button
          onClick={() =>
            setFilters({
              search: "",
              priority: [],
              subject: [],
              completed: "all",
            })
          }
          className="text-sm text-red-500 hover:text-red-700 underline"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default FilterTasks;
