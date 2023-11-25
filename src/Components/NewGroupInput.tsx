import React from "react";
import styled from "styled-components";
import { useTodoContext } from "../Context";

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
`;
const StyledGroupInput = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 12px;
  padding-left: 20px;
  font-size: 18px;
  outline: none;

  &:focus {
    background-color: #eaeaea;
    box-shadow: 0px 5px 0px 0px #4c4c4c;
  }
`;

const StyledGroupButton = styled.button`
  width: 130px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  background-color: #3191ffbd;
  color: white;
  font-weight: 600;

  &:hover {
    transform: scale(1.05);
    background-color: white;
    border: 2px solid #3191ffbd;
    color: #3191ffbd;
    box-shadow: 0px 5px 0px 0px #3191ffbd;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const NewGroupInput = () => {
  const { handleSubmit, setInput, input } = useTodoContext();

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledGroupInput
        type="text"
        placeholder="Create new group"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <StyledGroupButton>Create Group</StyledGroupButton>
    </StyledForm>
  );
};

export default NewGroupInput;
