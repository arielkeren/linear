import ControlButton from "./ControlButton";
import { HiHome } from "react-icons/hi";
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
} from "react-icons/bs";

interface Props {
  resetDragOffset: () => void;
  movePlane: (direction: "up" | "down" | "right" | "left") => void;
}

const Controls: React.FC<Props> = ({ resetDragOffset, movePlane }) => {
  const moveUp = () => movePlane("up");
  const moveDown = () => movePlane("down");
  const moveRight = () => movePlane("right");
  const moveLeft = () => movePlane("left");

  return (
    <div className="absolute top-4 right-4 flex flex-col items-center gap-1 z-10">
      <ControlButton buttonFunction={moveUp} icon={BsFillCaretUpFill} />
      <div className="flex gap-1">
        <ControlButton buttonFunction={moveLeft} icon={BsFillCaretLeftFill} />
        <ControlButton buttonFunction={resetDragOffset} icon={HiHome} />
        <ControlButton buttonFunction={moveRight} icon={BsFillCaretRightFill} />
      </div>
      <ControlButton buttonFunction={moveDown} icon={BsFillCaretDownFill} />
    </div>
  );
};

export default Controls;
