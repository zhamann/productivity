import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import type { List } from "../app/page";

interface NewTaskProps {
  listTitles: string[];
  setLists: Dispatch<SetStateAction<List[]>>;
}

export default function NewTask({ listTitles, setLists }: NewTaskProps) {
  const [showTools, setShowTools] = useState(false);
  const [name, setName] = useState("");
  const [listTitle, setListTitle] = useState(listTitles[0]);

  const toolsRef = useRef<HTMLDivElement>(null);

  function handleAdd() {
    setLists((prevState) => {
      // Returns the largest id value to avoid conflict when adding new task
      const maxId = Math.max(
        ...prevState.flatMap((list) => list.tasks.flatMap((task) => task.id)),
      );
      const updatedLists = prevState.map((list) => {
        return list.title === listTitle
          ? { ...list, tasks: [...list.tasks, { id: maxId + 1, name }] }
          : list;
      });
      return updatedLists;
    });
    setName("");
  }

  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setShowTools(true)}
        placeholder="Add a new task..."
        className="w-full border-0 border-b bg-transparent px-0 focus:border-indigo-500 focus:ring-0"
      />
      <div
        ref={toolsRef}
        style={{
          height: showTools ? `${toolsRef.current?.scrollHeight}px` : "0",
        }}
        className="overflow-hidden rounded-b-xl bg-slate-900 text-slate-400 transition-all duration-300 ease-linear"
      >
        <div className="flex items-center justify-between">
          <select
            onChange={(e) => setListTitle(e.target.value)}
            className="border-0 border-r border-slate-800 bg-slate-900 py-4 text-sm focus:border-slate-800 focus:ring-0"
          >
            {listTitles.map((title, index) => (
              <option key={index} value={title} selected={listTitle === title}>
                {title}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="border-l border-slate-800 px-4 py-4 text-sm"
          >
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
