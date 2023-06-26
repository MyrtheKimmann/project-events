import { Select, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { EventsContext } from "../EventsContext";

export const FilterEvents = () => {
  const { categories, setSelectedEvents } = useContext(EventsContext);

  const fetchFilterEvent = async (categoryId) => {
    const response = await fetch(
      `http://localhost:3000/events?categoryIds_like=${categoryId}`
    );
    return { filteredEvent: await response.json() };
  };

  const handleChange = (e) => {
    /* update selectedEvents state met events waarvan de categoryId van option 
    hetzelfde is als categoryId van de event */
    fetchFilterEvent(e.target.value).then(({ filteredEvent }) => {
      setSelectedEvents(filteredEvent);
    });
  };

  return (
    <Box textAlign={"center"} pb={"60px"} pl={"10px"}>
      <Select onChange={handleChange} placeholder={"All"} w={"135px"}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};
