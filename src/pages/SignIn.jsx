import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Highlight,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchemeSingIn } from "../yup/yupSchemeSingIn.js";
import { userSignedIn } from "../reducers/isSignedInUser.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../toast/toast.js";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(yupSchemeSingIn) });

  const onSubmit = async (data) => {
    try {
      let response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });

      let userSignedInNow = await response.json();

      dispatch(
        userSignedIn({
          uid: userSignedInNow.uid,
          email: userSignedInNow.email,
          displayName: userSignedInNow.displayName,
        }),
      );

      if (userSignedInNow.name === "FirebaseError") {
        showToast(toast, "warning", "Firebase Error - Invalid-Credential");
        return console.log(userSignedInNow.code);
      }
      navigate("/");
      showToast(toast, "success", "User is signed in");
    } catch (e) {
      console.error(`error ${e}`);
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
            query="Login"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "green.500",
              color: "white",
            }}
          >
            Login
          </Highlight>
        </Heading>
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel optionalIndicator={"*"} fontSize={11} mb={0.5}>
                Email
              </FormLabel>
              <Input {...register("email")} placeholder="Email" size="sm" />
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.email?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel optionalIndicator={"*"} fontSize={11} mb={0.5}>
                Password
              </FormLabel>
              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
                size="sm"
              />
              <FormErrorMessage mt={0.5} fontSize={11}>
                {errors.password?.message}
              </FormErrorMessage>
            </FormControl>
            <Button size="sm" type="submit">
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>
    </Center>
  );
};
