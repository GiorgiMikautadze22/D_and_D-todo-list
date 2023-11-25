import React from "react";
import styled from "styled-components";
import { useTodoContext } from "../Context";
import { Todo } from "../types";

const TodoList = styled.div`
  height: 30px;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 0px 20px;
  box-shadow: 5px 5px 0px 0px #606060bc;
  display: flex;
  justify-content: space-between;

  &:hover {
    transition: 120ms;
    transform: scale(1.05);
    box-shadow: 0px 0px 10px 5px #3191ffbd;
  }
`;

interface Props {
  todoList: Todo[];
  handleTodoDelete: (id: number) => void;
  handleCheckboxChange: (id: number) => void;
  handleTodoCopy: (id: number) => void;
}

const GroupTodoList = ({
  todoList,
  handleTodoDelete,
  handleCheckboxChange,
  handleTodoCopy,
}: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {todoList.map((todo) => (
        <TodoList>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(todo.id)}
            />
            <p
              style={{
                display: "flex",
                margin: "auto 0px",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.text}
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <img
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                margin: "auto 0px",
              }}
              onClick={() => handleTodoCopy(todo.id)}
              src="https://static.thenounproject.com/png/4058382-200.png"
              alt=""
            />
            <img
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                margin: "auto 0px",
              }}
              src="https://cdn-icons-png.flaticon.com/512/5974/5974771.png"
              alt=""
              onClick={() => handleTodoDelete(todo.id)}
            />
          </div>
        </TodoList>
      ))}
    </div>
  );
};

export default GroupTodoList;
