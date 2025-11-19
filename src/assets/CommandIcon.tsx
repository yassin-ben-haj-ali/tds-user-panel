type CommandIconProps = {
  active?: boolean;
};

const CommandIcon: React.FC<CommandIconProps> = ({ active }) => {
  const color = active ? "white" : "#808080";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  );
};
export default CommandIcon;
