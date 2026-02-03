import { create } from 'zustand';

interface FormStore {
  email: string;
  userName: string;
  password: string;
  setEmail: (email: string) => void;
  setUserName: (userName: string) => void;
  setPassword: (password: string) => void;
  resetData: () => void;
}

const useFormStore = create<FormStore>((set) => ({
  email: '',
  userName: '',
  password: '',
  setEmail: (email) => set({ email }),
  setUserName: (userName) => set({ userName }),
  setPassword: (password) => set({ password }),
  resetData: () => set({ email: '', userName: '', password: '' }),
}));

export default useFormStore;
