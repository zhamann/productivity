import { useDrop } from "react-dnd";
import Task from "./Task";
import { useRef, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

interface CardProps {
  title: string;
  tasks: {
    id: number;
    name: string;
  }[];
  onDropTask: (
    task: { id: number; name: string },
    targetCardTitle: string,
  ) => void;
  handleChange: (
    task: { id: number; name: string },
    isCompleted: boolean,
  ) => void;
}

export default function Card({
  title,
  tasks,
  onDropTask,
  handleChange,
}: CardProps) {
  const [showTasks, setShowTasks] = useState(true);

  const taskContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number; name: string }) => {
      onDropTask(item, title);
    },
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-800"
    >
      <button
        disabled={tasks.length === 0}
        onClick={() => setShowTasks(!showTasks)}
      >
        <div
          className={`flex w-full items-center justify-between ${showTasks && "border-b border-slate-800"} bg-slate-900 p-4`}
        >
          <div className="font-xl font-semibold">{`${title} (${tasks.length})`}</div>
          {tasks.length > 0 &&
            (showTasks ? <HiChevronUp /> : <HiChevronDown />)}
        </div>
      </button>
      {showTasks && (
        <div ref={taskContainerRef}>
          <div className="flex grow flex-col divide-y">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                isCompletedCard={title === "Completed"}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
