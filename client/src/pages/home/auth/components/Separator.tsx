interface SeparatorProps {
  color?: string;
  ariaHidden?: boolean;
}

const Separator = ({
  color = '#232323',
  ariaHidden = true,
}: SeparatorProps) => (
  <div
    className="h-2 w-full"
    style={{ backgroundColor: color }}
    aria-hidden={ariaHidden}
  ></div>
);

export default Separator;
