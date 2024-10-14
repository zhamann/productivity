import type { Dispatch, SetStateAction } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import type { Item, List } from "~/app/page";

interface GridProps {
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
}

export default function Grid({ lists, setLists }: GridProps) {
  function handleDropTask(droppedTask: Item, targetCardTitle: string) {
    setLists((prevLists) => {
      // Remove task from its current card
      const updatedCards = prevLists.map((card) => {
        if (card.tasks.some((task) => task.id === droppedTask.id)) {
          return {
            ...card,
            tasks: card.tasks.filter((task) => task.id !== droppedTask.id),
          };
        }
        return card;
      });

      // Add task to the target card
      return updatedCards.map((card) => {
        if (card.title === targetCardTitle) {
          return {
            ...card,
            tasks: [...card.tasks, droppedTask],
          };
        }
        return card;
      });
    });
  }

  function handleChange(updatedTask: Item, isCompleted: boolean) {
    setLists((prevCards) => {
      // Remove task from its current card
      const updatedLists = prevCards.map((card) => {
        if (card.tasks.some((task) => task.id === updatedTask.id)) {
          return {
            ...card,
            tasks: card.tasks.filter((task) => task.id !== updatedTask.id),
          };
        }
        return card;
      });

      // Add task to the appropriate card
      let taskAdded = false; // Track whether the task has been added

      return updatedLists.map((card) => {
        if (isCompleted && card.title === "Completed") {
          return {
            ...card,
            tasks: [...card.tasks, updatedTask],
          };
        }

        // Add to the first non-Completed card if task is not completed
        if (!isCompleted && !taskAdded && card.title !== "Completed") {
          taskAdded = true; // Mark task as added
          return {
            ...card,
            tasks: [...card.tasks, updatedTask],
          };
        }

        return card;
      });
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4">
        {lists.map((list, index) => (
          <Card
            key={index}
            title={list.title}
            tasks={list.tasks}
            onDropTask={handleDropTask}
            handleChange={handleChange}
          />
        ))}
      </div>
    </DndProvider>
  );
}
