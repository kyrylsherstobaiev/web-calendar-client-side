import {
  Box,
  Flex,
  Grid,
  Stack,
  GridItem,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

//React related imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

//Component imports
import { CalendarCustom } from "../CalendarPicker/index.js";
import { Header } from "../Header.jsx";
import { Day } from "../Day.jsx";
import { Week } from "../Week.jsx";
import { HoursScale } from "../HoursScale.jsx";
import { CardEvent } from "../CardEvent/CardEvent.jsx";
import { SpinnerFetch } from "../SpinnerFetch/SpinnerFetch.jsx";
import { Button } from "../Button/";

//Hooks
import { useGetWeek } from "./hook/useGetWeek.js";

//Other imports
import moment from "moment";
import { getEvents } from "../../api/api.js";

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

export const UserSignedIn = () => {
  const { user } = useSelector((state) => state.isSignedInUser);
  const pickedDate = useSelector((state) => state.pickedDate);
  const date = moment(pickedDate.date, "DD/MM/YYYY");
  const [isDay, setIsDay] = useState("day");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dates } = useGetWeek(date);

  const { data, isPending, isSuccess, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(`${user.uid}`),
    enabled: true,
  });

  if (isPending) {
    return (
      <Center mt={100}>
        <SpinnerFetch />
      </Center>
    );
  }

  if (error) {
    console.log("Fetching error");
  }

  if (isSuccess) {
    if (data.length === 0) {
      console.log("No events were fetched");
    }
  }

  return (
    <Box justifyItems="center" bg="gray.50" pb={3}>
      <Header onSelected={(value) => setIsDay(value)} />
      <Flex justify="center" px="1rem">
        <Flex maxW="1300px" width="full" gap="0.75rem">
          <Stack position="sticky" top="68px" alignSelf="flex-start">
            <Button
              onClick={onOpen}
              style={{ width: "100%", letterSpacing: "0.01rem" }}
            >
              New Event
            </Button>
            <CardEvent onClose={onClose} isOpen={isOpen} />
            <CalendarCustom />
          </Stack>

          <Grid
            bg="white"
            flex={1}
            // px={4}
            gridTemplateColumns="auto 1fr"
            gridTemplateRows="repeat(25,35px)"
            h="calc(100vh - 80px)"
            overflow="auto"
          >
            <GridItem
              gridColumn="1"
              gridRow="1/2"
              bg="white"
              position="sticky"
              top="0"
              borderBottom="1px"
              borderColor="green.300"
            ></GridItem>
            <GridItem gridColumn="1" gridRow="2/26">
              <HoursScale />
            </GridItem>

            <GridItem gridColumn="2" gridRow="1/26">
              {isDay === "day" ? (
                <Day date={date} dayEvents={data} />
              ) : (
                <Week daysInWeek={dates} weekEvents={data} />
              )}
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};
