import { useMutation } from "@tanstack/react-query";
import { api } from "../services/api";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data) => {
      return api.post('/contact', data);
    },
  });
}
