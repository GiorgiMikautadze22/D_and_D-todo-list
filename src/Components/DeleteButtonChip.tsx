import * as React from "react";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { Group } from "../types";
import { useTodoContext } from "../Context";

interface Props {
  el: Group;
}

export default function DeleteButtonChip({ el }: Props) {
  const { handleDelete } = useTodoContext();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <Chip
        sx={{ width: "90px" }}
        size="lg"
        variant="solid"
        color="danger"
        endDecorator={<ChipDelete onDelete={() => handleDelete(el.id)} />}
      >
        Delete
      </Chip>
    </Box>
  );
}
