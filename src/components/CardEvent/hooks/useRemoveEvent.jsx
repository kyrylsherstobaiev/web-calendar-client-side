import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../../../api/api.js";
import { useToast } from "@chakra-ui/react";
import { showToast } from "../../../toast/toast.js";

export const useRemoveEvent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const removeEvent = useMutation({
    mutationKey: ["removeEvent"],
    mutationFn: deleteEvent,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const prevEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData(["events"], (old) =>
        old.filter((event) => event.id !== id),
      );
      return { prevEvents };
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["events"], context.prevEvents);
      showToast(toast, "error", "Event wasn't removed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      showToast(toast, "info", "Event was removed");
    },
  });

  return { removeEvent };
};
