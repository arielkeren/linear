import IGraph from "@/types";
import Graph from "./Graph";
import { useState } from "react";
import Controls from "../controls/Controls";

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

  const resetDragOffset = () => {
    setDragXOffset(0);
    setDragYOffset(0);
  };

  const movePlane = (direction: "up" | "down" | "right" | "left") => {
    const MOVE_INTENSITY = 7;

    switch (direction) {
      case "up":
        setDragYOffset(
          (previousDragYOffset) => previousDragYOffset + MOVE_INTENSITY
        );
        break;
      case "down":
        setDragYOffset(
          (previousDragYOffset) => previousDragYOffset - MOVE_INTENSITY
        );
        break;
      case "right":
        setDragXOffset(
          (previousDragXOffset) => previousDragXOffset - MOVE_INTENSITY
        );
        break;
      case "left":
        setDragXOffset(
          (previousDragXOffset) => previousDragXOffset + MOVE_INTENSITY
        );
        break;
    }
  };

  return (
    <>
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

      <Controls resetDragOffset={resetDragOffset} movePlane={movePlane} />
    </>
  );
};

export default Plane;
