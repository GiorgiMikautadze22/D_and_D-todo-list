import React, { useState } from "react";
import styled from "styled-components";
import { useTodoContext } from "../Context";
import { Todo } from "../types";
import GroupTodoList from "./GroupTodoList";

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
    box-shadow: 0px 0px 100000px 1000px #3191ffbd;
  }
`;

const AddTodo = () => {
  // const { addNewTodo, setTodo, todo } = useTodoContext();

  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTodo = todo.trim();
    if (trimmedTodo.length > 0) {
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          text: todo,
          isCompleted: false,
        },
      ]);
    }
    setTodo("");
  };

  const handleTodoDelete = (id: number) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const handleCheckboxChange = (id: number) => {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleTodoCopy = (id: number) => {
    const todoToCopy = todoList.find((todo) => todo.id === id);

    if (todoToCopy) {
      setTodoList([
        ...todoList,
        {
          id: todoList.length + 1,
          text: todoToCopy.text,
          isCompleted: false,
        },
      ]);
    }
  };

  return (
    <>
      <form onSubmit={addNewTodo}>
        <TodoInput
          type="text"
          placeholder="Enter ToDo"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
      </form>
      <GroupTodoList
        todoList={todoList}
        handleTodoDelete={handleTodoDelete}
        handleCheckboxChange={handleCheckboxChange}
        handleTodoCopy={handleTodoCopy}
      />
    </>
  );
};

export default AddTodo;
