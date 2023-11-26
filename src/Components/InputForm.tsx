import React, { useState } from "react";
import { useTodoContext } from "../Context";
import styled from "styled-components";
import { Todo } from "../types";

const TodoInput = styled.input`
  height: 35px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  border: none;
  padding-left: 20px;
  outline: none;
  font-size: 16px;
  border: 2px solid #3191ffbd;

  &:focus {
    transform: scale(1.2);
    box-shadow: 0px 0px 100000px 100000px #3191ffbd;
  }
`;

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputForm = ({ setTodoList, todoList }: Props) => {
  const [todo, setTodo] = useState<string>("");

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTodo = todo.trim();
    if (trimmedTodo.length > 0) {
      const newTodo = [
        ...todoList,
        {
          id: Math.random(),
          text: todo,
          isCompleted: false,
        },
      ];
      setTodoList(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
    }
    setTodo("");
  };

  return (
    <form onSubmit={addNewTodo}>
      <TodoInput
        type="text"
        placeholder="Enter ToDo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  );
};

export default InputForm;
