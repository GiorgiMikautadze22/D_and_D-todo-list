import React from "react";
import styled from "styled-components";
import { useTodoContext } from "../Context";
import { Todo } from "../types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  handleTodoCopy: (id: number) => void;
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
    <Droppable droppableId={singleTodo.text} type="todolist">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Draggable draggableId={singleTodo.text} index={index}>
            {(provided, snapshot) => (
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
                      onClick={() => handleTodoCopy(singleTodo.id)}
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default GroupTodoList;
