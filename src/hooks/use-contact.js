import { useMutation } from "@tanstack/react-query";

export function useCreateContact() {
  return useMutation({
    mutationFn: async (data) => {
      // Simulare trimitere formular fără server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact form submitted:", data);
      return { success: true };
    },
  });
}
