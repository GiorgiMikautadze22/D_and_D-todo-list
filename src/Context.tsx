import { ReactNode, createContext, useContext, useState } from "react";
import { Group, TodoContextType, Todo } from "./types";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [group, setGroup] = useState<Group[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trinmmedGroupInput = input.trim();
    if (trinmmedGroupInput.length > 0) {
      setGroup([
        ...group,
        {
          id: group.length + 1,
          text: trinmmedGroupInput,
        },
      ]);
    }
    setInput("");
  };

  const handleDelete = (id: number) => {
    setGroup(group.filter((item) => item.id !== id));
    // alert(` ${groupName} has been deleted`)
  };

  return (
    <TodoContext.Provider
      value={{
        group,
        handleSubmit,
        input,
        setInput,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
}
