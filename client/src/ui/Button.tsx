interface ButtonProps {
  size: 'sm' | 'md' | 'lg' | 'full';
  text: string;
  color?: 'bg-red-600' | 'bg-red-700';
  screen?: 'auth' | 'hero';
}

const Button = ({ size, text, color = 'bg-red-600' }: ButtonProps) => {
  let btnSize = '';
  if (size === 'full') {
    btnSize = 'w-full';
  }
  return (
    <button
      className={` py-2  text-white font-semibold rounded-md hover:bg-red-700 ${color} ${btnSize}`}
    >
      {text}
    </button>
  );
};

export default Button;
