interface Props {
  equation: string;
  color: string;
  thickness: number;
  deepness: number;
}

const Graph: React.FC<Props> = ({ equation, color, thickness, deepness }) => {
  const SCALAR = 50;

  const expression = equation.replaceAll(" ", "").toLowerCase().slice(2);

  let slopeString = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] == "x") break;
    slopeString += expression[i];
  }
  const slope = Number(slopeString);

  let yIntersectionString = "";
  for (let i = slopeString.length + 1; i < expression.length; i++) {
    yIntersectionString += expression[i];
  }
  const yIntersection = Number(yIntersectionString);

  const angleWithXAxis = Math.atan(slope);
  const radiansToRotate =
    angleWithXAxis >= 0 ? -angleWithXAxis : 2 * Math.PI - angleWithXAxis;
  const yIntersectionOffset = -yIntersection * SCALAR;
  const heightOffset = -thickness / 2;
  const totalOffset = yIntersectionOffset + heightOffset;

  return (
    <div
      className="absolute w-full"
      style={{
        height: thickness,
        backgroundColor: color,
        zIndex: deepness,
        transform: `translate(128px, calc(50vh + ${totalOffset}px)) rotate(${radiansToRotate}rad) scaleX(100)`,
      }}
    ></div>
  );
};

export default Graph;
