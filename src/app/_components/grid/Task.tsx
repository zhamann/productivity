import { useRef } from "react";
import { useDrag } from "react-dnd";
import { HiBars3 } from "react-icons/hi2";

interface TaskProps {
  task: {
    id: number;
    name: string;
  };
  isCompletedCard: boolean;
  handleChange: (
    task: { id: number; name: string },
    isCompleted: boolean,
  ) => void;
}

export default function Task({
  task,
  isCompletedCard,
  handleChange,
}: TaskProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [, drag, preview] = useDrag({
    type: "TASK",
    item: task,
  });

  drag(dragRef);
  preview(previewRef);

  return (
    <div
      ref={previewRef}
      className="font-xl flex w-full items-center justify-between gap-4 border-slate-800 bg-slate-950 p-4 text-slate-400"
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="rounded-full border-slate-800 bg-slate-950"
          checked={isCompletedCard}
          onChange={(e) => handleChange(task, e.target.checked)}
        />
        <div>{task.name}</div>
      </div>
      <div ref={dragRef} className="cursor-move text-slate-800">
        <HiBars3 size={20} />
      </div>
    </div>
  );
}
