import { useRef, useState } from "react";
import { IconType } from "react-icons";

interface Props {
  buttonFunction: () => void;
  icon: IconType;
}

const HomeButton: React.FC<Props> = ({ buttonFunction, icon }) => {
  const holdInterval = useRef<NodeJS.Timer | null>(null);

  const startHold = () => {
    holdInterval.current = setInterval(() => {
      buttonFunction();
    }, 10);
  };

  const stopHold = () => {
    if (!holdInterval.current) return;
    clearInterval(holdInterval.current);
  };

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseOut={stopHold}
      className="text-gray-200 bg-gray-800 text-lg h-7 w-7 rounded flex justify-center items-center"
    >
      {icon({})}
    </button>
  );
};

export default HomeButton;
