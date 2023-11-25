import React from "react";
import styled from "styled-components";
import GroupTodoList from "./GroupTodoList";
import { useTodoContext } from "../Context";
import DeleteButtonChip from "./DeleteButtonChip";
import AddTodo from "./AddTodo";

const GroupsSection = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 50px;
  margin: 100px 10%;
`;

const GroupName = styled.h2`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  background-color: #3191ffbd;
  color: white;
  padding: 5px 10px;
  box-shadow: 5px 5px 0px 0px darkblue;
  height: 50px;
`;

const GroupCard = styled.div`
  width: 350px;
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

const Groups = () => {
  const { group } = useTodoContext();

  return (
    <GroupsSection>
      {group.map((el) => (
        <GroupCard>
          <GroupName>
            <h3>{el.text}</h3>
            <DeleteButtonChip el={el} />
          </GroupName>
          <AddTodo />
        </GroupCard>
      ))}
    </GroupsSection>
  );
};

export default Groups;
