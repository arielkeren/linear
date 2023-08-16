import ControlButton from "./ControlButton";
import { HiHome } from "react-icons/hi";
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillCaretRightFill,
  BsFillCaretLeftFill,
} from "react-icons/bs";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { TbZoomFilled } from "react-icons/tb";

interface Props {
  resetDragOffset: () => void;
  movePlane: (direction: "up" | "down" | "right" | "left") => void;
  resetZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const Controls: React.FC<Props> = ({
  resetDragOffset,
  movePlane,
  resetZoom,
  zoomIn,
  zoomOut,
}) => {
  const moveUp = () => movePlane("up");
  const moveDown = () => movePlane("down");
  const moveRight = () => movePlane("right");
  const moveLeft = () => movePlane("left");

  return (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      <div className="flex flex-col items-center gap-1">
        <ControlButton buttonFunction={moveUp} icon={BsFillCaretUpFill} />
        <div className="flex gap-1">
          <ControlButton buttonFunction={moveLeft} icon={BsFillCaretLeftFill} />
          <ControlButton buttonFunction={resetDragOffset} icon={HiHome} />
          <ControlButton
            buttonFunction={moveRight}
            icon={BsFillCaretRightFill}
          />
        </div>
        <ControlButton buttonFunction={moveDown} icon={BsFillCaretDownFill} />
      </div>

      <div className="flex flex-col gap-1">
        <ControlButton buttonFunction={zoomIn} icon={FaPlus} />
        <ControlButton buttonFunction={resetZoom} icon={TbZoomFilled} />
        <ControlButton buttonFunction={zoomOut} icon={FaMinus} />
      </div>
    </div>
  );
};

export default Controls;
