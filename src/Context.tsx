import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Group, TodoContextType, Todo } from "./types";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [group, setGroup] = useState<Group[]>(() => {
    const storedGroup = localStorage.getItem("todoGroup");
    return storedGroup ? JSON.parse(storedGroup) : [];
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedGroupInput = input.trim();
    if (trimmedGroupInput.length > 0) {
      const newGroup = [
        ...group,
        {
          id: Math.random(),
          text: trimmedGroupInput,
        },
      ];
      setGroup(newGroup);

      localStorage.setItem("todoGroup", JSON.stringify(newGroup));
    }

    setInput("");
  };

  const handleDelete = (id: number) => {
    setGroup((prevGroup) => {
      const updatedGroup = prevGroup.filter((item) => item.id !== id);

      localStorage.setItem("todoGroup", JSON.stringify(updatedGroup));

      return updatedGroup;
    });
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
