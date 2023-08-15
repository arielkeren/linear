import IGraph from "@/types";
import Graph from "./Graph";
import { useState } from "react";

interface Props {
  slots: IGraph[];
}

const Plane: React.FC<Props> = ({ slots }) => {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [dragXOffset, setDragXOffset] = useState(0);
  const [dragYOffset, setDragYOffset] = useState(0);

  const onEnter = () => setIsMouseInside(true);

  const onLeave = () => setIsMouseInside(false);

  const onPress = () => setIsMousePressed(true);

  const onRelease = () => setIsMousePressed(false);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseInside || !isMousePressed) return;
    setDragXOffset(
      (previousDragXOffset) => previousDragXOffset + event.movementX
    );
    setDragYOffset(
      (previousDragYOffset) => previousDragYOffset + event.movementY
    );
  };

  return (
    <div
      className={`w-[calc(100vw-256px)] ${isMouseInside && "cursor-grab"} ${
        isMouseInside && isMousePressed && "cursor-grabbing"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseMove={onMove}
    >
      {slots.map(
        (slot, index) =>
          slot.isShown && (
            <Graph
              equation={slot.equation}
              color={slot.color}
              thickness={slot.thickness}
              deepness={9 - index}
              dragXOffset={dragXOffset}
              dragYOffset={dragYOffset}
              key={index}
            />
          )
      )}

      <Graph
        equation="y=0"
        color="#111827"
        thickness={5}
        dragXOffset={dragXOffset}
        dragYOffset={dragYOffset}
        deepness={-1}
      />
      <Graph
        equation="y=9999x"
        color="#111827"
        thickness={5}
        dragXOffset={dragXOffset}
        dragYOffset={dragYOffset}
        deepness={-1}
      />
    </div>
  );
};

export default Plane;
