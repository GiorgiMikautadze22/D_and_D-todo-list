import { ReactNode, createContext, useContext, useState } from "react";
import { Group, TodoContextType, Todo } from "./types";

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [group, setGroup] = useState<Group[]>(() => {
    const storedGroup = localStorage.getItem("group");
    return storedGroup ? JSON.parse(storedGroup) : [];
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedGroupInput = input.trim();

    const groupIndex = group.findIndex((g) => g.text === trimmedGroupInput);

    if (trimmedGroupInput.length > 0 && groupIndex === -1) {
      const newGroup = [
        ...group,
        {
          id: Math.random(),
          text: trimmedGroupInput,
          todos: [],
        },
      ];
      setGroup(newGroup);

      localStorage.setItem("group", JSON.stringify(newGroup));
    } else if (groupIndex !== -1) {
      alert("Group with that name already exists");
    } else if (trimmedGroupInput.length === 0) {
      alert("Please provide valid name");
    }

    setInput("");
  };

  const handleDelete = (id: number) => {
    setGroup((prevGroup) => {
      const updatedGroup = prevGroup.filter((item) => item.id !== id);

      localStorage.setItem("group", JSON.stringify(updatedGroup));

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
        setGroup,
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
