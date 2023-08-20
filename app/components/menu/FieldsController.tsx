import { useState } from "react";
import Field from "./Field";

interface Props {
  changeSlot: (newSlot: string) => void;
  closeMenu: () => void;
}

const FieldsController: React.FC<Props> = ({ changeSlot, closeMenu }) => {
  const [slope, setSlope] = useState("");
  const [yIntercept, setYIntercept] = useState("");
  const [point1, setPoint1] = useState("");
  const [point2, setPoint2] = useState("");

  const changeSlope = (newValue: string) => setSlope(newValue);
  const changeYIntercept = (newValue: string) => setYIntercept(newValue);
  const changePoint1 = (newValue: string) => setPoint1(newValue);
  const changePoint2 = (newValue: string) => setPoint2(newValue);

  const isNumber = (text: string) => {
    text = text.replaceAll(" ", "");
    if (text.length === 0) return false;
    for (const character of text) {
      if (
        character !== "." &&
        character !== "-" &&
        (character < "0" || character > "9")
      )
        return false;
    }
    return true;
  };

  const isPoint = (text: string) => {
    text = text.replaceAll(" ", "");
    if (text.length < 5 || text[0] !== "(" || text.at(-1) !== ")") return false;
    const [x, y] = text.substring(1, text.length - 1).split(",");
    return isNumber(x) && isNumber(y);
  };

  const constructEquation = (m: number, b: number) =>
    changeSlot(
      `y=${m === 1 ? "x" : m !== 0 ? `${m}x` : ""}${
        (b > 0 && m === 0) || b < 0
          ? b
          : b > 0
          ? `+${b}`
          : b === 0 && m === 0
          ? 0
          : ""
      }`
    );

  const calculateEquation = () => {
    const m = Number(slope);
    const b = Number(yIntercept);
    const [x1, y1] = point1
      .substring(1, point1.length - 1)
      .split(",")
      .map((value) => Number(value));
    const [x2, y2] = point2
      .substring(1, point2.length - 1)
      .split(",")
      .map((value) => Number(value));

    const isSlopeGiven = isNumber(slope);
    const isYInterceptGiven = isNumber(yIntercept);
    const isPoint1Given = isPoint(point1);
    const isPoint2Given = isPoint(point2);

    if (
      Number(isSlopeGiven) +
        Number(isYInterceptGiven) +
        Number(isPoint1Given) +
        Number(isPoint2Given) <
      2
    )
      return;

    if (isSlopeGiven && isYInterceptGiven) constructEquation(m, b);
    else if (isSlopeGiven && isPoint1Given) constructEquation(m, y1 - m * x1);
    else if (isSlopeGiven && isPoint2Given) constructEquation(m, y2 - m * x2);
    else if (isYInterceptGiven && isPoint1Given)
      constructEquation((y1 - b) / x1, b);
    else if (isYInterceptGiven && isPoint2Given)
      constructEquation((y2 - b) / x2, b);
    else
      constructEquation(
        (y1 - y2) / (x1 - x2),
        y1 - (x1 * (y1 - y2)) / (x1 - x2)
      );

    closeMenu();
  };

  return (
    <div className="flex flex-col gap-1">
      <Field
        label="Slope"
        placeholder="m-value"
        value={slope}
        changeValue={changeSlope}
      />
      <Field
        label="y-Intercept"
        placeholder="b-value"
        value={yIntercept}
        changeValue={changeYIntercept}
      />
      <Field
        label="Point 1"
        placeholder="(x,y)"
        value={point1}
        changeValue={changePoint1}
      />
      <Field
        label="Point 2"
        placeholder="(x,y)"
        value={point2}
        changeValue={changePoint2}
      />
      <div className="flex justify-around w-full mt-10">
        <button
          onClick={closeMenu}
          className="border-2 border-red-500 text-gray-200 text-xl h-12 w-28 rounded uppercase hover:bg-red-500"
        >
          Cancel
        </button>
        <button
          onClick={calculateEquation}
          className="border-2 border-blue-500 text-gray-200 text-xl h-12 w-28 rounded uppercase transition-colors hover:bg-blue-500"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FieldsController;
