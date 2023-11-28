import React, { useState } from "react";
import { useTodoContext } from "../Context";
import styled from "styled-components";
import { Group, Todo } from "../types";
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
    box-shadow: 0px 0px 100000px 100000px #3191ffbd;
  }
`;

interface Props {
  el: Group;
}

const AddTodo = ({ el }: Props) => {
  const { group, setGroup } = useTodoContext();

  const [todo, setTodo] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todo");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTodo = todo.trim();
    if (trimmedTodo.length > 0) {
      const newTodo = {
        id: Math.random(),
        text: todo,
        isCompleted: false,
      };
      const updatedGroups = [...group];
      const groupIndex = updatedGroups.findIndex((g) => g.text === el.text);
      updatedGroups[groupIndex].todos.push(newTodo);
      setGroup(updatedGroups);

      localStorage.setItem("group", JSON.stringify(group));
    }

    setTodo("");
  };

  const handleTodoDelete = (id: number) => {
    const updatedGroups = [...group];
    const groupIndex = updatedGroups.findIndex((g) => g.text === el.text);
    updatedGroups[groupIndex].todos.splice(id, 1);
    setGroup(updatedGroups);
    localStorage.setItem("group", JSON.stringify(group));
  };

  const handleCheckboxChange = (id: number) => {
    setTodos((prevTodoList) => {
      const uptadetTodoList = prevTodoList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );
      localStorage.setItem("todo", JSON.stringify(uptadetTodoList));
      return uptadetTodoList;
    });
  };

  const handleTodoCopy = (id: number) => {
    const todoToCopy = todos.find((todo) => todo.id === id);

    if (todoToCopy) {
      const uptadetTodoList = [
        ...todos,
        {
          id: Math.random(),
          text: todoToCopy.text,
          isCompleted: false,
        },
      ];
      setTodos(uptadetTodoList);
      localStorage.setItem("todo", JSON.stringify(uptadetTodoList));
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
      {todos
        ? el.todos.map((singleTodo, index) => (
            <GroupTodoList
              key={index}
              handleTodoDelete={() => handleTodoDelete(index)}
              handleCheckboxChange={handleCheckboxChange}
              handleTodoCopy={handleTodoCopy}
              singleTodo={singleTodo}
            />
          ))
        : null}
    </>
  );
};

export default AddTodo;
