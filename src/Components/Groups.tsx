import React from "react";
import styled from "styled-components";
import GroupTodoList from "./GroupTodoList";

interface Props {
  group: string[];
  todo: string[];
  setTodo: React.Dispatch<React.SetStateAction<string[]>>;
  addNewTodo: (e: React.FormEvent) => void;
}

const GroupsSection = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 50px;
  margin: 100px 10%;
`;

const GroupName = styled.h2`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background-color: #3191ffbd;
  color: white;
  padding: 5px;
  box-shadow: 5px 5px 0px 0px darkblue;
`;

const GroupCard = styled.div`
  width: 300px;
  min-height: 200px;
  background-color: #e6e6e6;
  box-shadow: 5px 5px 0px 0px #3191ffbd;
  border: 2px solid #3191ffbd;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

const Groups = ({ group, todo, addNewTodo, setTodo }: Props) => {
  const handleTodoChange = (index: number, value: string) => {
    setTodo((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  return (
    <GroupsSection>
      {group.map((el) => (
        <GroupCard>
          <GroupName>{el}</GroupName>
          <form onSubmit={addNewTodo}>
            {todo.map((value, index) => (
              <TodoInput
                type="text"
                placeholder="Enter ToDo"
                onChange={(e) => handleTodoChange(index, e.target.value)}
                value={value}
              />
            ))}
          </form>
          <GroupTodoList />
        </GroupCard>
      ))}
    </GroupsSection>
  );
};

export default Groups;
