import styled from "styled-components";
import { useTodoContext } from "../Context";
import DeleteButtonChip from "./DeleteButtonChip";
import AddTodo from "./AddTodo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const GroupsSection = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto;
  gap: 75px;
  margin: 100px 0px;
`;

const GroupName = styled.div`
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
  const { group, setGroup } = useTodoContext();

  const handleGroupDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reOrderedGroups = [...group];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedTodo] = reOrderedGroups.splice(sourceIndex, 1);
      reOrderedGroups.splice(destinationIndex, 0, removedTodo);

      return setGroup(reOrderedGroups);
    }

    localStorage.setItem("group", JSON.stringify(group));
  };

  return (
    <DragDropContext onDragEnd={handleGroupDragAndDrop}>
      <Droppable droppableId="ROOT" type="group" direction="horizontal">
        {(provided) => (
          <GroupsSection ref={provided.innerRef} {...provided.droppableProps}>
            {group.map((el, index) => (
              <Draggable
                draggableId={`group-${el.id}`}
                key={el.id}
                index={index}
              >
                {(provided) => (
                  <GroupCard
                    key={index}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <GroupName {...provided.dragHandleProps}>
                      <h2>{el.text}</h2>
                      <DeleteButtonChip el={el} />
                    </GroupName>

                    <AddTodo el={el} />
                  </GroupCard>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </GroupsSection>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Groups;
