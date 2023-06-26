import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventContext } from "../EventContext";

export const DeleteEvent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();
  const { event } = useContext(EventContext);
  const navigate = useNavigate();

  const deleteEvent = async () => {
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
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
      title: "Event deleted.",
      description: "We've deleted your event.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const errorToast = () => {
    toast({
      title: "Event not deleted.",
      description: "Sorry, we can't delete the event.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button ml={"10px"} bgColor={"indianRed"} onClick={onOpen}>
        Delete event
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can not undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              <Button colorScheme="red" ml={3} onClick={deleteEvent}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
