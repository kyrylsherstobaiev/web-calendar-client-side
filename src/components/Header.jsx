import {
  Box,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { DropDown } from "./DropDown/index.js";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setToday } from "../reducers/isToday.js";
import { userSignedOut } from "../reducers/isSignedInUser.js";
import { showToast } from "../toast/toast.js";
import { Button } from "./Button";

export const Header = ({ onSelected }) => {
  const pickedDate = useSelector((state) => state.pickedDate);
  // noinspection JSUnresolvedReference
  let date = moment(pickedDate.date, 'DD/MMM/YYYY"');

  const user = useSelector((state) => state.isSignedInUser);

  const dispatch = useDispatch();
  const toast = useToast();

  const { email, displayName } = user.user;

  const onSignOut = async () => {
    try {
      let response = await fetch("http://localhost:3000/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      let userSignedOutNow = await response.json();

      dispatch(userSignedOut());
      showToast(toast, "success", "Account signed out.");
    } catch (e) {
      console.error(`error ${e}`);
    }
  };

  return (
    <Box
      bg="white"
      display="flex"
      justifyContent="center"
      boxShadow="lg"
      mb={3}
      px="1rem"
      py="0.5rem"
      position="sticky"
      top="0"
      zIndex="20"
    >
      <Box maxW="1300px" width="100%">
        <Flex justify="space-between" alignItems="center">
          <Flex align="center" gap={4}>
            <Flex align="center">
              <Image src="../../img/logo-in-calendar.svg" alt="logo-calendar" />
              <Heading as="h4" size="md" fontWeight={400}>
                WebCalendar
              </Heading>
            </Flex>
            <Box>
              <Button
                size="xs"
                onClick={() => dispatch(setToday(`${new Date().getDate()}`))}
                style={{ padding: "0.1rem 0.75rem", fontSize: "0.8rem" }}
              >
                Today
              </Button>
            </Box>
            <Box>
              <Text fontWeight="700" fontSize={16} letterSpacing={-0.5}>
                {date.format("ddd, DD MMM YYYY")}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <Flex align="center" gap={1}>
              <DropDown onSelected={(value) => onSelected(value)} />
              <Tooltip hasArrow label="Sign out" bg="blue.600">
                <Flex
                  onClick={onSignOut}
                  align="center"
                  gap={1}
                  cursor="pointer"
                >
                  <Flex
                    mx={2}
                    flexDirection="column"
                    fontSize={10}
                    fontWeight="700"
                  >
                    <Box fontWeight="700" fontSize={13}>
                      {displayName}
                    </Box>
                    <Box color="blue.800">{email}</Box>
                  </Flex>
                  <Circle
                    size="30px"
                    bg="green.500"
                    color="white"
                    fontSize={20}
                    fontWeight={700}
                  >
                    {email[0].toUpperCase()}
                  </Circle>
                </Flex>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
