import { create } from 'zustand';
import { produce } from 'immer';

export interface UserInfo {
  data: {
    username: string;
  };
  updateUser: (name: string) => void;
}

export const useUserInfo = create<UserInfo>((set) => ({
  data: {
    username: 'Default',
  },
  updateUser(name: string) {
    set(
      produce((state) => {
        state.data.username = name;
      }),
    );
  },
}));
