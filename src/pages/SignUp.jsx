import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Highlight,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { yupSchemeSingUp } from "../yup/yupSchemeSingUp.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { showToast } from "../toast/toast.js";

export const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(yupSchemeSingUp) });

  const onSubmit = async (newUser) => {
    try {
      let response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newUser),
      });

      showToast(toast, "success", "Account created");
      reset();
      navigate("/signin");
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  // noinspection JSValidateTypes
  return (
    <Center height="100vh" bg="gray.50">
      <Box
        p={6}
        borderRadius={3}
        w="350px"
        boxShadow="2xl"
        bg="white"
        textAlign="center"
        mx={2}
      >
        <Heading as="h3" mb={4} fontSize={20}>
          <Highlight
            query="SignUp"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "green.500",
              color: "white",
            }}
          >
            SignUp
          </Highlight>
        </Heading>
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel optionalIndicator={"*"} fontSize={11} mb={0.5}>
                Email
              </FormLabel>
              <Input placeholder="Email" {...register("email")} size="sm" />
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel optionalIndicator={"*"} fontSize={11} mb={0.5}>
                Password
              </FormLabel>
              <Input
                placeholder="Password"
                size="sm"
                type="password"
                {...register("password")}
              />
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="firstName" isInvalid={!!errors.firstName}>
              <FormLabel fontSize={11} mb={0.5} optionalIndicator={"*"}>
                First name
              </FormLabel>
              <Input
                placeholder="First name"
                {...register("firstName")}
                size="sm"
              ></Input>
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.firstName?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="lastName" isInvalid={!!errors.lastName}>
              <FormLabel fontSize={11} mb={0.5} optionalIndicator={"*"}>
                Last name
              </FormLabel>
              <Input
                placeholder="Last name"
                {...register("lastName")}
                size="sm"
              ></Input>
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.lastName?.message}
              </FormErrorMessage>
            </FormControl>
            <Button size="sm" type="submit">
              Register
            </Button>
          </Stack>
        </Container>
      </Box>
    </Center>
  );
};
