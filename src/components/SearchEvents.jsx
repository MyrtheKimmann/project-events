import { Input, Box } from "@chakra-ui/react";
import { EventsContext } from "../EventsContext";
import { useContext } from "react";

export const SearchEvents = () => {
  const { setSelectedEvents } = useContext(EventsContext);

  const fetchSearchEvents = async (typedWords) => {
    const response = await fetch(
      `http://localhost:3000/events?q=${typedWords}`
    );
    return { searchedEvent: await response.json() };
  };

  const handleChange = (e) => {
    /* update selectedEvents state met events waarvan text van de input
    hetzelfde is als de text van de event */
    fetchSearchEvents(e.target.value).then(({ searchedEvent }) => {
      setSelectedEvents(searchedEvent);
    });
  };

  return (
    <Box textAlign={"center"}>
      <Input
        onChange={handleChange}
        border={"1px"}
        placeholder={"search"}
        w={"250px"}
        mb={"20px"}
      ></Input>
    </Box>
  );
};
