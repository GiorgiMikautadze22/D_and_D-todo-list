import React from "react";
import styled from "styled-components";
import { Todo } from "../types";
import { Draggable } from "react-beautiful-dnd";

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
  handleTodoDelete: (id: number) => void;
  handleCheckboxChange: (id: number) => void;
  handleTodoCopy: (id: number, index: number) => void;
  singleTodo: Todo;
  index: number;
}

const GroupTodoList = ({
  handleTodoDelete,
  handleCheckboxChange,
  handleTodoCopy,
  singleTodo,
  index,
}: Props) => {
  return (
    <Draggable
      draggableId={`todo-${singleTodo.id}`}
      key={singleTodo.id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TodoList>
            <div style={{ display: "flex", gap: "10px" }}>
              {singleTodo.isCompleted ? (
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(singleTodo.id)}
                  checked
                />
              ) : (
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(singleTodo.id)}
                />
              )}
              <p
                style={{
                  display: "flex",
                  margin: "auto 0px",
                  textDecoration: singleTodo.isCompleted
                    ? "line-through"
                    : "none",
                }}
              >
                {singleTodo.text}
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
                onClick={() => handleTodoCopy(singleTodo.id, index)}
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
                onClick={() => handleTodoDelete(singleTodo.id)}
              />
            </div>
          </TodoList>
        </div>
      )}
    </Draggable>
  );
};

export default GroupTodoList;
