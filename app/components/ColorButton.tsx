import { FaCheck } from "react-icons/fa6";

interface Props {
  availableColor: string;
  color: string;
  changeColor: (newColor: string) => void;
}

const ColorButton: React.FC<Props> = ({
  availableColor,
  color,
  changeColor,
}) => {
  const changeThisColor = () => changeColor(availableColor);

  return (
    <button
      onClick={changeThisColor}
      className="h-7 w-7 flex justify-center items-center"
      style={{ backgroundColor: availableColor }}
    >
      {availableColor === color && <FaCheck className="text-white" />}
    </button>
  );
};

export default ColorButton;
