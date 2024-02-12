import create from "zustand";

type UserSession = {
  isLoggedIn: boolean;
  username: string | null;
};

type UserSessionStore = {
  userSession: UserSession;
  login: (username: string) => void;
  logout: () => void;
};

const useUserSessionStore = create<UserSessionStore>((set) => ({
  userSession: {
    isLoggedIn: false,
    username: null,
  },
  login: (username) => {
    set((state) => ({
      userSession: {
        isLoggedIn: true,
        username: username,
      },
    }));
  },
  logout: () => {
    set((state) => ({
      userSession: {
        isLoggedIn: false,
        username: null,
      },
    }));
  },
}));

export default useUserSessionStore;
