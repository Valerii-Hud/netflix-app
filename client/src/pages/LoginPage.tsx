import useFormStore from '../store/useFormStore';
import Form from '../ui/Form';

const LoginPage = () => {
  const { email, password, resetData } = useFormStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
    resetData();
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
