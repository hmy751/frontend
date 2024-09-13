import create from "zustand";

interface User {
  id: string;
  name: string;
  imageSrc: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoggedIn: !!localStorage.getItem("user"),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, isLoggedIn: true });
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useUserStore;
