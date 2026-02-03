import Form from '../ui/Form';
import useFormStore from '../store/useFormStore';

const SignUpPage = () => {
  const { email, password, userName, resetData } = useFormStore();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, userName, password);
    resetData();
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
