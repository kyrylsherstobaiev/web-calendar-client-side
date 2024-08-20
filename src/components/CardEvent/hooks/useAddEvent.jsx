import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent } from "../../../api.js";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../../toast/toast.js";

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const createEvent = useMutation({
    mutationKey: ["addEvent"],
    mutationFn: addEvent,
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const prevEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData(["events"], (old) => {
        return [...old, newEvent];
      });
      return { prevEvents };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(["events"], context.prevEvents);
      showToast(toast, "error", "Event weren't added");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      showToast(toast, "success", "Event was created!");
    },
  });

  return { createEvent };
};
