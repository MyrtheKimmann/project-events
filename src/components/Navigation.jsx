import { Box, List, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box>
      <UnorderedList
        display={"flex"}
        justifyContent={"flex-end"}
        padding={"30px 30px 0px 0px"}
        gap={"30px"}
        textTransform={"uppercase"}
        fontWeight={"lighter"}
      >
        <List>
          <Link to="/">Events</Link>
        </List>
        <List>
          <Link to="/event/new">Add event</Link>
        </List>
      </UnorderedList>
    </Box>
  );
};
