import { Image, Box, Text, Badge, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { EventsContext } from "../EventsContext";
// components
import { SearchEvents } from "../components/SearchEvents";
import { FilterEvents } from "../components/FilterEvents";

export const EventsPage = () => {
  const { categories, events } = useLoaderData();
  const [selectedEvents, setSelectedEvents] = useState(events);

  return (
    <>
      <Heading
        pt={"60px"}
        pb={"40px"}
        textAlign={"center"}
        color={"DarkSeaGreen"}
      >
        Events
      </Heading>

      <EventsContext.Provider value={{ setSelectedEvents, events, categories }}>
        <SearchEvents />
        <FilterEvents />
        <Box
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={"30px"}
          pb={"200px"}
        >
          {selectedEvents.map((event) => (
            <Link to={`event/${event.id}`} key={event.id}>
              <Box
                w={"280px"}
                h={"390px"}
                bgColor={"white"}
                border={"1px solid lightgray"}
                overflow={"hidden"}
                cursor={"pointer"}
                textAlign={"center"}
                fontSize={"14px"}
              >
                <Image
                  src={event.image}
                  w={"280px"}
                  h={"220px"}
                  objectFit={"cover"}
                  pb={"10px"}
                />
                <Text fontWeight={"bolder"} fontSize={"18px"}>
                  {event.title}
                </Text>
                <Text>{event.description}</Text>

                {/* if event.categoryIds includes category.id, render badge with category.name */}
                {categories.map(
                  (category) =>
                    event.categoryIds.includes(category.id) && (
                      <Badge colorScheme={"pink"} ml={"5px"} key={category.id}>
                        {category.name}
                      </Badge>
                    )
                )}

                <Text color={"green"}>Start time</Text>
                <Text>{event.startTime}</Text>
                <Text color={"red"}>End time</Text>
                <Text>{event.endTime}</Text>
              </Box>
            </Link>
          ))}
        </Box>
      </EventsContext.Provider>
    </>
  );
};
