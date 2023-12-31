import React, { useState } from "react";
import { useTodoContext } from "../Context";
import styled from "styled-components";
import { Group } from "../types";
import GroupTodoList from "./GroupTodoList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

      localStorage.setItem("group", JSON.stringify(updatedGroups));
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
    const updatedGroups = [...group];
    const groupIndex = updatedGroups.findIndex((g) => g.text === el.text);

    updatedGroups[groupIndex].todos = updatedGroups[groupIndex].todos.map(
      (item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );

    setGroup(updatedGroups);
    localStorage.setItem("group", JSON.stringify(updatedGroups));
  };

  const handleTodoCopy = (id: number, index: number) => {
    const updatedGroups = [...group];
    const groupIndex = updatedGroups.findIndex((g) => g.text === el.text);
    const todoToCopy = updatedGroups[groupIndex].todos.find(
      (todo) => todo.id === id
    );

    if (todoToCopy) {
      const copiedTodo = {
        id: Math.random(),
        text: todoToCopy.text,
        isCompleted: false,
      };

      updatedGroups[groupIndex].todos.splice(index + 1, 0, copiedTodo);

      setGroup(updatedGroups);
      localStorage.setItem("group", JSON.stringify(updatedGroups));
    }
  };

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "todolist") {
      const updatedGroups = [...group];
      const groupIndex = updatedGroups.findIndex((g) => g.text === el.text);

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedTodo] = updatedGroups[groupIndex].todos.splice(
        sourceIndex,
        1
      );
      updatedGroups[groupIndex].todos.splice(destinationIndex, 0, removedTodo);
      localStorage.setItem("group", JSON.stringify(group));

      return setGroup(updatedGroups);
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
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId={el.text} type="todolist">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {el
                ? el.todos.map((singleTodo, index) => (
                    <GroupTodoList
                      key={index}
                      handleTodoDelete={() => handleTodoDelete(index)}
                      handleCheckboxChange={handleCheckboxChange}
                      handleTodoCopy={handleTodoCopy}
                      singleTodo={singleTodo}
                      index={index}
                    />
                  ))
                : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default AddTodo;
