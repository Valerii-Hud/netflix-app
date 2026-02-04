import { Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import useFormStore from '../store/useFormStore';

interface FormProps {
  formType: 'login' | 'signup';
  email: string;
  password: string;
  userName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ formType, email, password, userName, onSubmit }: FormProps) => {
  const { setUserName, setPassword, setEmail } = useFormStore();

  return (
    <div className="hero-bg w-full h-screen">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={'/'}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4 ">
            {formType === 'signup' ? 'Sign Up' : 'Login'}
          </h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            {formType === 'signup' && (
              <Input
                name="username"
                placeholder="nickname"
                value={userName}
                onChange={setUserName}
              />
            )}
            <Input
              name="email"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              name="password"
              placeholder="•••••••••••"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Button
              size="full"
              text={formType === 'signup' ? 'Sign Up' : 'Login'}
            />
          </form>
          <div className="text-center text-gray-400">
            {formType === 'signup'
              ? 'Already a member'
              : `Don't have an account`}
            ?{' '}
            <Link
              to={`/${formType === 'signup' ? 'login' : 'signup'}`}
              className="text-red-500 hover:underline"
            >
              {' '}
              {formType === 'signup' ? 'Sign In' : 'Sign Up'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
