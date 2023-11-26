import React, { useState } from "react";
import styled from "styled-components";
import { Todo } from "../types";
import GroupTodoList from "./GroupTodoList";
import { useTodoContext } from "../Context";
import InputForm from "./InputForm";

const AddTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todo");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const handleTodoDelete = (id: number) => {
    setTodoList((prevTodoList) => {
      const uptadetTodoList = prevTodoList.filter((todo) => todo.id !== id);

      localStorage.setItem("todo", JSON.stringify(uptadetTodoList));

      return uptadetTodoList;
    });
  };

  const handleCheckboxChange = (id: number) => {
    // setTodoList(
    //   todoList.map((item) =>
    //     item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    //   )
    // );
    setTodoList((prevTodoList) => {
      const uptadetTodoList = prevTodoList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      );

      localStorage.setItem("todo", JSON.stringify(uptadetTodoList));

      return uptadetTodoList;
    });
  };

  const handleTodoCopy = (id: number) => {
    const todoToCopy = todoList.find((todo) => todo.id === id);

    if (todoToCopy) {
      const uptadetTodoList = [
        ...todoList,
        {
          id: todoList.length + 1,
          text: todoToCopy.text,
          isCompleted: false,
        },
      ];
      setTodoList(uptadetTodoList);
      localStorage.setItem("todo", JSON.stringify(uptadetTodoList));
    }
  };

  return (
    <>
      <InputForm todoList={todoList} setTodoList={setTodoList} />

      {todoList.map((singleTodo) => (
        <GroupTodoList
          handleTodoDelete={handleTodoDelete}
          handleCheckboxChange={handleCheckboxChange}
          handleTodoCopy={handleTodoCopy}
          singleTodo={singleTodo}
        />
      ))}
    </>
  );
};

export default AddTodo;
