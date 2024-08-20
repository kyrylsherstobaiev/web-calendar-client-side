import { Grid } from "@chakra-ui/react";
import { Day } from "./Day.jsx";

export const Week = ({ daysInWeek, weekEvents }) => {
  const week = daysInWeek.map((el, i) => (
    <Day date={el} dayEvents={weekEvents} key={i + "g"} />
  ));

  return (
    <Grid gap="1px" gridAutoFlow="column" fontSize={11}>
      {week.map((day) => day)}
    </Grid>
  );
};
