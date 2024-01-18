import { create } from 'zustand';

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

const useUserStore = create<UserStore>((set) => ({
  user: null,
  changeAll: (data: UserStore['user']) => set({ user: data }),
  changeProperty: (data: any) => set((state) => ({ ...state, user: { ...state.user, ...data } })),
  resetUser: () => set({ user: null }),
}));

export default useUserStore;
