interface InputProps {
  name: string;
  placeholder: string;
  value: string | undefined;
  type?: string;
  onChange: (value: string) => void;
  screen?: 'auth' | 'hero';
}

const Input = ({
  name,
  value,
  placeholder,
  type = 'text',
  screen = 'auth',
  onChange,
}: InputProps) => {
  const nameForLabel = name[0].toUpperCase() + name.slice(1);
  const basicInputStyles = `  text-white border border-gray-700  focus:outline-none focus:ring  `;

  let inputStyles = '';

  if (screen === 'auth') {
    inputStyles =
      basicInputStyles + 'px-3 py-2 w-full mt-1 rounded-md bg-transparent';
  }

  if (screen === 'hero') {
    inputStyles = basicInputStyles + 'p-2 rounded flex-1 bg-black/80';
  }

  return (
    <>
      {screen === 'auth' ? (
        <div>
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-300 block"
          >
            {nameForLabel}

            <InputElement
              value={value}
              type={type}
              inputStyles={inputStyles}
              placeholder={placeholder}
              name={name}
              onChange={onChange}
            />
          </label>
        </div>
      ) : (
        <InputElement
          value={value}
          type={type}
          inputStyles={inputStyles}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
      )}
    </>
  );
};

interface InputElementProps extends InputProps {
  inputStyles: string;
}

const InputElement = ({
  value,
  type,
  inputStyles,
  placeholder,
  name,
  onChange,
}: InputElementProps) => (
  <input
    value={value}
    type={type}
    className={inputStyles}
    placeholder={placeholder}
    id={name}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default Input;
