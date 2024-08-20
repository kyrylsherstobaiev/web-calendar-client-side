// noinspection JSValidateTypes

// Library Imports
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

// Custom Imports
import { yupSchemeCreateEvent } from "../../yup/yupSchemeCreateEvent.js";
import { useAddEvent } from "./hooks/useAddEvent.jsx";
import { useChangeEvent } from "./hooks/useChangeEvent.jsx";
import { useRemoveEvent } from "./hooks/useRemoveEvent.jsx";

export const CardEvent = ({
  isOpen,
  onClose,
  titleValue = null,
  dateValue = null,
  startTimeEventValue = null,
  endTimeEventValue = null,
  id = null,
}) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { createEvent } = useAddEvent();
  const { changeEvent } = useChangeEvent();
  const { removeEvent } = useRemoveEvent();

  const { user } = useSelector((state) => state.isSignedInUser);

  const options = new Array(24).fill(null).map((_, i) => {
    return <option value={i} key={i + "f"}>{`${i}:00`}</option>;
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(yupSchemeCreateEvent),
  });

  const onSubmit = async (newEvent, e) => {
    try {
      e.preventDefault();

      const event = {
        ...newEvent,
        uid: user.uid,
        ...(titleValue && { id: id }),
      };

      if (!titleValue) {
        createEvent.mutate(event);
      } else {
        changeEvent.mutate(event);
      }

      reset();
      onClose();
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>
              {!titleValue ? "Create" : "Update"} your event
            </ModalHeader>
            <ModalCloseButton onClick={() => reset()} />
            <ModalBody pb={6}>
              <FormControl id="title" isInvalid={!!errors.title}>
                <FormLabel mb={1} optionalIndicator={"*"}>
                  Title:
                </FormLabel>
                <Input
                  ref={initialRef}
                  {...register("title")}
                  placeholder="Describe event"
                  size="sm"
                  defaultValue={titleValue}
                />
                <FormErrorMessage mt={0.5} fontSize={11}>
                  {errors.title?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.dateEvent} flex={1}>
                <FormLabel optionalIndicator={"*"} mb={1}>
                  Select date:
                </FormLabel>
                <Input
                  type="date"
                  {...register("dateEvent")}
                  size="sm"
                  defaultValue={dateValue}
                />
                <FormErrorMessage mt={0.5} fontSize={11}>
                  {errors.dateEvent?.message}
                </FormErrorMessage>
              </FormControl>
              <Flex mt={2} gap={2}>
                <FormControl isInvalid={!!errors.startTimeEvent}>
                  <FormLabel optionalIndicator={"*"} mb={1}>
                    Select start time:
                  </FormLabel>
                  <Select
                    {...register("startTimeEvent")}
                    placeholder="Select end time event"
                    size="sm"
                    defaultValue={startTimeEventValue}
                  >
                    {options.map((el) => el)}
                  </Select>
                  <FormErrorMessage mt={0.5} fontSize={11}>
                    {errors.startTimeEvent?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.endTimeEvent}>
                  <FormLabel optionalIndicator={"*"} mb={1}>
                    Select end time:
                  </FormLabel>
                  <Select
                    {...register("endTimeEvent")}
                    placeholder="Select end time event"
                    size="sm"
                    defaultValue={endTimeEventValue}
                  >
                    {options.map((el) => el)}
                  </Select>
                  <FormErrorMessage mt={0.5} fontSize={11}>
                    {errors.endTimeEvent?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" type="submit" mr={1} size="md">
                Save
              </Button>
              <Button
                mr={1}
                size="md"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              {titleValue ? (
                <Button
                  onClick={() => {
                    removeEvent.mutate(id);
                    reset();
                    onClose();
                  }}
                  size="md"
                  colorScheme="red"
                  bg="red.400"
                >
                  Delete
                </Button>
              ) : null}
            </ModalFooter>
          </ModalContent>
        </Container>
      </Modal>
    </>
  );
};
