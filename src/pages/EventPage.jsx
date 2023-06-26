import { Heading, Text, Box, Image, Badge, List } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { EventContext } from "../EventContext";
// components
import { EditEvent } from "../components/EditEvent";
import { DeleteEvent } from "../components/DeleteEvent";

// loader function
export const eventLoader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();

  return (
    <>
      <Box
        padding={"80px"}
        w={{ base: "430px", lg: "1000px" }}
        fontSize={{ base: "15px", lg: "18px" }}
        textAlign={"center"}
        ml={"auto"}
        mr={"auto"}
      >
        <Image
          src={event.image}
          w={{ base: "270px", lg: "400px" }}
          h={{ base: "250px", lg: "400px" }}
          float={{ lg: "right" }}
          objectFit={"cover"}
          mb={"10px"}
          borderRadius={"4%"}
        ></Image>
        <Heading size={{ base: "md", lg: "lg" }}>
          {event.title}
          {/* if event.categoryIds includes category.id, render badge with category.name */}
          {categories.map(
            (category) =>
              event.categoryIds.includes(category.id) && (
                <List display="inline-block" key={category.id}>
                  <Badge colorScheme={"pink"} ml={"5px"} mt={"-10px"}>
                    {category.name}
                  </Badge>
                </List>
              )
          )}
        </Heading>
        <Text mb={"10px"}>{event.description}</Text>

        <Text>Created by</Text>
        {/* if event.createdBy includes user.id, render badge with user.name */}
        {users.map(
          (user) =>
            event.createdBy === user.id && (
              <List color="black" key={user.id}>
                <Badge colorScheme={"pink"} mr={"5px"} mb={"10px"}>
                  {user.name}
                </Badge>
                <Image
                  src={user.image}
                  w={"100px"}
                  ml={"auto"}
                  mr={"auto"}
                  borderRadius={"50%"}
                  mb={"20px"}
                ></Image>
              </List>
            )
        )}
        <Text color={"green"}>Start time</Text>
        <Text>{event.startTime}</Text>
        <Text color={"red"}>End time</Text>
        <Text pb={"20px"}>{event.endTime}</Text>

        <EventContext.Provider value={{ event, categories, users }}>
          <EditEvent />
          <DeleteEvent />
        </EventContext.Provider>
      </Box>
    </>
  );
};

// loader function for Eventspage and AddEvent
export const eventsLoader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return {
    events: await events.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};
