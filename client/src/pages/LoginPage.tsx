import useAuthStore from '../store/useAuthStore';
import useFormStore from '../store/useFormStore';
import isDefaultError from '../types/guards';
import Form from '../ui/Form';

const LoginPage = () => {
  const { login } = useAuthStore();
  const { email, password, resetData, saveData } = useFormStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      login({ email, password });
      resetData();
    } catch (error) {
      if (isDefaultError(error)) {
        saveData({ email, password });
      }
    }
  };
  return (
    <Form
      formType="login"
      email={email}
      password={password}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
