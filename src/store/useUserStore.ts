import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: number;
  nickname: string;
  email: string;
  profileUrl: string;
  provider: string;
}

export interface UserStore {
  user: User | null,
  changeAll: (data: UserStore['user']) => void;
  changeProperty: (data: any) => void;
  resetUser: () => void;
}

const useUserStore: StateCreator<UserStore> = (set) => ({
  user: null,
  changeAll: (data: UserStore['user']) => set({ user: data }),
  changeProperty: (data: any) => set((state) => ({ ...state, user: { ...state.user, ...data } })),
  resetUser: () => set({ user: null }),
});

const persistedUseUserStore = persist<UserStore>(
  useUserStore,
  {
    name: 'userStore',
    storage: createJSONStorage(() => sessionStorage),
  },
);

export default create(persistedUseUserStore);
