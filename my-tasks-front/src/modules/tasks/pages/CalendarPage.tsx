import { Calendar, Views, type View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localizer } from "../constants/tasks.constants";
import type { CalendarEvent } from "../types/tasks.types";
import { useTasks } from "../hooks/useTasks";

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const { tasks } = useTasks();

  useEffect(() => {
    if (tasks) {
      const mappedEvents = tasks
        .filter((task) => task.dueDate)
        .map((task) => {
          const startDate = new Date(task.dueDate!);
          const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 
          return {
            id: task.id,
            title: task.title,
            start: startDate,
            end: endDate,
            allDay: false,
            priority:
              task.priority && task.priority.length > 0
                ? task.priority[0]
                : "medium",
            completed: task.completed,
          };
        });
      setEvents(mappedEvents);
    }
  }, [tasks]);

  const handleSelectEvent = (event: CalendarEvent) => {
    navigate(`/mytasks/${event.id}`);
  };

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#3174ad";

    if (event.completed) {
      backgroundColor = "#10B981";
    } else {
      switch (event.priority) {
        case "high":
          backgroundColor = "#EF4444";
          break;
        case "medium":
          backgroundColor = "#F59E0B";
          break;
        case "low":
          backgroundColor = "#FCD34D";
          break;
        default:
          backgroundColor = "#3174ad";
      }
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="p-4 h-[calc(100vh-100px)]">
      <h2 className="text-4xl font-bold text-violet-800 italic mb-2">
        Task Calendar
      </h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        view={view}
        onView={handleOnChangeView}
        date={date}
        onNavigate={onNavigate}
      />
    </div>
  );
}
