import Form from '../ui/Form';
import useFormStore from '../store/useFormStore';
import useAuthStore from '../store/useAuthStore';
import isDefaultError from '../types/guards';

const SignUpPage = () => {
  const { signup } = useAuthStore();

  const { email, password, userName, resetData, saveData } = useFormStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      signup({ email, userName, password });
      resetData();
    } catch (error) {
      if (isDefaultError(error)) {
        saveData({ userName, email, password });
      }
    }
  };

  return (
    <Form
      formType="signup"
      email={email}
      password={password}
      userName={userName}
      onSubmit={handleSubmit}
    />
  );
};

export default SignUpPage;
