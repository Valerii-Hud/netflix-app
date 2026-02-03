interface InputProps {
  name: string;
  placeholder: string;
  value: string | undefined;
  type?: string;
  onChange: (value: string) => void;
}

const Input = ({
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
}: InputProps) => {
  const nameForLabel = name[0].toUpperCase() + name.slice(1);
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-300 block">
        {nameForLabel}
      </label>
      <input
        value={value}
        type={type}
        className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
        placeholder={placeholder}
        id={name}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default Input;
