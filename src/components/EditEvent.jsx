import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../EventContext";

export const EditEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { event, categories, users } = useContext(EventContext);
  const toast = useToast();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      createdBy: event.createdBy,
      title: event.title,
      description: event.description,
      image: event.image,
      categoryIds: event.categoryIds,
      attendedBy: event.attendedBy,
      location: event.location,
      startTime: event.startTime,
      endTime: event.endTime,
    },
  });

  const onSubmit = async (data) => {
    // make createdBy a number
    data.createdBy = parseInt(data.createdBy);

    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          succesToast();
          navigate(`/`);
        }
        if (!res.ok) {
          errorToast();
        }
      })
      .catch(() => {
        errorToast();
      });
  };

  const succesToast = () => {
    toast({
      title: "Event edited.",
      description: "We've edited your event.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: "Event not edited.",
      description: "Sorry, we can't edit the event.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button bgColor={"DarkSeaGreen"} onClick={onOpen}>
        Edit event
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"DarkSeaGreen"}>Edit event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              color="gray"
              display={"flex"}
              borderRadius={"6%"}
              flexDirection={"column"}
              justifyContent={"center"}
              width={"400px"}
              gap={"10px"}
              pb={"40px"}
              margin={"0px auto"}
            >
              <FormLabel color="black">
                Created By
                <Select variant="flushed" {...register("createdBy", {})}>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormLabel>

              <FormLabel color="black">
                Title
                <Input
                  type="text"
                  variant="flushed"
                  {...register("title", {})}
                />
              </FormLabel>

              <FormLabel color="black">
                Description
                <Input
                  type="text"
                  variant="flushed"
                  {...register("description", {})}
                />
              </FormLabel>

              <FormLabel color="black">
                Image url
                <Input
                  type="url"
                  variant="flushed"
                  {...register("image", {})}
                />
              </FormLabel>

              <FormLabel color="black">
                Category
                <Select variant="flushed" {...register("categoryIds", {})}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormLabel>

              <FormLabel color="black">
                Attended by
                <Select variant="flushed" {...register("attendedBy", {})}>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormLabel>

              <FormLabel color="black">
                Location
                <Input
                  type="text"
                  variant="flushed"
                  {...register("location", {})}
                />
              </FormLabel>

              <FormLabel color="black">
                Start time
                <Input
                  type="datetime-local"
                  variant="flushed"
                  {...register("startTime", {})}
                />
              </FormLabel>

              <FormLabel color="black">
                End time
                <Input
                  type="datetime-local"
                  variant="flushed"
                  {...register("endTime", {})}
                />
              </FormLabel>

              <Button
                type="submit"
                w={"80px"}
                bgColor={"DarkSeaGreen"}
                onClick={onClose}
              >
                Edit
              </Button>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
