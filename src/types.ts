export interface Group {
  id: number;
  text: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

export interface TodoContextType {
  group: Group[];
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (id: number) => void;
  setGroup: React.Dispatch<React.SetStateAction<Group[]>>;
}
