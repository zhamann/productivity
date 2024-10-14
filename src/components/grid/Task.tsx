import { useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { HiBars3 } from "react-icons/hi2";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import type { Item } from "~/app/page";

interface TaskProps {
  task: Item;
  isCompletedCard: boolean;
  handleChange: (task: Item, isCompleted: boolean) => void;
}

export default function Task({
  task,
  isCompletedCard,
  handleChange,
}: TaskProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLButtonElement>(null);
  const [, drag, preview] = useDrag({
    type: "TASK",
    item: task,
  });

  drag(dragRef);
  preview(previewRef);

  const [name, setName] = useState(task.name);
  const [notes, setNotes] = useState(task.notes);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
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
            <div className="text-start">{name}</div>
          </div>
          <div ref={dragRef} className="cursor-move text-slate-800">
            <HiBars3 size={20} />
          </div>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="rounded-full border-slate-800 bg-slate-950"
                checked={isCompletedCard}
                onChange={(e) => handleChange(task, e.target.checked)}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Task name"
                className="w-full border-0 border-b bg-transparent px-0 focus:border-indigo-500 focus:ring-0"
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4 text-sm text-white">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Task notes..."
            rows={4}
            className="mt-1 w-full resize-none rounded-lg bg-transparent text-sm focus:ring-indigo-500"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
