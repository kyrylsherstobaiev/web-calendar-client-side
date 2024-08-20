import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../../../api.js";
import moment from "moment";
import { showToast } from "../../../toast/toast.js";
import { useToast } from "@chakra-ui/react";

export const useChangeEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const changeEvent = useMutation({
    mutationKey: ["updateEvent"],
    mutationFn: updateEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const prevEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData(["events"], (old) => {
        return old.map((event) => {
          if (event.id === newEvent.id) {
            return {
              ...event,
              ...newEvent,
              dateEvent: moment(newEvent.dateEvent).clone().format(),
            };
          }
          return event;
        });
      });
      return { prevEvents };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["events"], context.prevEvents);
      showToast(toast, "error", "Event weren't updated");
    },
    onSuccess: () => {
      // noinspection JSIgnoredPromiseFromCall
      queryClient.invalidateQueries({ queryKey: ["events"] });
      showToast(toast, "success", "Event was updated!");
    },
  });

  return { changeEvent };
};
