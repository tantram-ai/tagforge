import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


interface AuthState {
  decoded: any | null;
  planDetails: any | null
  setTokenFromCookie: () => void;
  clearAuth: () => void;
}



export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      decoded: null,
      planDetails: null,
      setTokenFromCookie: () => {
        const token: any = Cookies.get("token");
        const planData: any = Cookies.get("planData")
        if (token) {
          try {
            const decoded = jwtDecode(token);
            const planDetails = jwtDecode(planData)
            set({ planDetails, decoded });
          } catch (error) {
            console.error("Invalid token:", error);
            set({ planDetails: null, decoded: null });
          }
        } else {
          set({ planDetails: null, decoded: null });
        }
      },

      clearAuth: () => {
        Cookies.remove("token");
        set({ planDetails: null, decoded: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        planDetails: state.planDetails,
        decoded: state.decoded,
      }),
    }
  )
);
