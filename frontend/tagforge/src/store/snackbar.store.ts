import { create } from "zustand";

type SnackbarType = "success" | "error" | "warning" | "info";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarType;
  showSnackbar: (message: string, severity?: SnackbarType) => void;
  closeSnackbar: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: "",
  severity: "info",
  showSnackbar: (message, severity = "info") =>
    set({ open: true, message, severity }),
  closeSnackbar: () => set({ open: false, message: "" }),
}));
