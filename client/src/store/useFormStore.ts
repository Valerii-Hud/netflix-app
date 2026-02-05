import { create } from 'zustand';
import type { User } from '../types';

interface FormStore {
  email: string;
  userName: string;
  password: string;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setPassword: (password: string) => void;
  resetData: () => void;
  saveData: ({ email, userName, password }: User) => void;
}

const useFormStore = create<FormStore>((set, get) => ({
  email: '',
  userName: '',
  password: '',
  setEmail: (email) => set({ email }),
  setUserName: (userName) => set({ userName }),
  setPassword: (password) => set({ password }),
  saveData: ({ email, userName, password }: User) => {
    const { setEmail, setUserName, setPassword } = get();
    if (userName) setUserName(userName);
    if (email) setEmail(email);
    if (password) setPassword(password);
  },
  resetData: () => set({ email: '', userName: '', password: '' }),
}));

export default useFormStore;
