import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";

export const AddEvent = () => {
  const { categories, users } = useLoaderData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      createdBy: "",
      title: "",
      description: "",
      image: "",
      categoryIds: "",
      attendedBy: "",
      location: "",
      startTime: "",
      endTime: "",
    },
  });
  const toast = useToast();

  const onSubmit = async (data) => {
    // make createdBy a number
    data.createdBy = parseInt(data.createdBy);

    fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      showToast();
      reset();
    }
  });

  const showToast = () => {
    toast({
      title: "Event created.",
      description: "We've created your event.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        color={"gray"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        width={"400px"}
        gap={"10px"}
        pb={"150px"}
        margin={"0px auto"}
      >
        <Heading color={"DarkSeaGreen"} pt={"60px"} pb={"20px"}>
          Add a new event
        </Heading>

        <Select
          variant={"flushed"}
          placeholder={"Created by"}
          {...register("createdBy", {
            required: {
              value: true,
              message: "Created by is required",
            },
          })}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Text color={"red"} fontSize={"14px"}>
          {errors.createdBy?.message}
        </Text>

        <Input
          type={"text"}
          variant={"flushed"}
          placeholder={"Title"}
          {...register("title", {
            required: {
              value: true,
              message: "Title is required",
            },
          })}
        />
        <Text color="red" fontSize="14px">
          {errors.title?.message}
        </Text>

        <Input
          type={"text"}
          variant={"flushed"}
          placeholder={"Description"}
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
        <Text color="red" fontSize="14px">
          {errors.description?.message}
        </Text>
        <Input
          type={"url"}
          variant={"flushed"}
          placeholder={"Image url"}
          {...register("image", {
            required: {
              value: true,
              message: "Image url is required",
            },
          })}
        />
        <Text color="red" fontSize="14px">
          {errors.image?.message}
        </Text>
        <Select
          variant={"flushed"}
          placeholder={"Category"}
          {...register("categoryIds", {
            required: {
              value: true,
              message: "Category is required",
            },
          })}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Text color={"red"} fontSize={"14px"}>
          {errors.categoryIds?.message}
        </Text>
        <Select
          variant={"flushed"}
          placeholder={"Attended by"}
          {...register("attendedBy", {
            required: {
              value: true,
              message: "Attended by is required",
            },
          })}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Text color={"red"} fontSize={"14px"}>
          {errors.attendedBy?.message}
        </Text>
        <Input
          type={"text"}
          variant={"flushed"}
          placeholder={"Location"}
          {...register("location", {
            required: {
              value: true,
              message: "Location is required",
            },
          })}
        />
        <Text color="red" fontSize="14px">
          {errors.location?.message}
        </Text>
        <FormLabel>
          Start time
          <Input
            type={"datetime-local"}
            variant={"flushed"}
            {...register("startTime", {
              required: {
                value: true,
                message: "Start time is required",
              },
            })}
          />
        </FormLabel>
        <Text color="red" fontSize="14px">
          {errors.startTime?.message}
        </Text>
        <FormLabel>
          End time
          <Input
            type={"datetime-local"}
            variant={"flushed"}
            {...register("endTime", {
              required: {
                value: true,
                message: "End time is required",
              },
            })}
          />
        </FormLabel>
        <Text color={"red"} fontSize={"14px"}>
          {errors.endTime?.message}
        </Text>

        <Button type={"submit"} w={"80px"} bgColor={"DarkSeaGreen"}>
          Add
        </Button>
      </FormControl>
    </form>
  );
};
