interface Props {
  equation: string;
  color: string;
  thickness: number;
  deepness: number;
  dragXOffset: number;
  dragYOffset: number;
}

const Graph: React.FC<Props> = ({
  equation,
  color,
  thickness,
  deepness,
  dragXOffset,
  dragYOffset,
}) => {
  const isAlphabetical = (character: string) =>
    character.toLowerCase() !== character.toUpperCase();

  const isNumber = (character: string) => character >= "0" && character <= "9";

  const isValid = () => {
    let e = equation.replaceAll(" ", "").toLowerCase();

    if (e.length >= 2 && e[0] === "y" && e[1] === "=") e = e.substring(2);

    if (
      e.length >= 5 &&
      isAlphabetical(e[0]) &&
      e[1] === "(" &&
      e[2] === "x" &&
      e[3] === ")" &&
      e[4] === "="
    )
      e = e.substring(5);

    if (e.length === 0) return false;

    const VALID_CHARACTERS = [
      "x",
      "+",
      "-",
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    for (const character of e) {
      if (!VALID_CHARACTERS.includes(character)) return false;
    }

    if (e[0] === "-" || e[0] === "+") e = e.substring(1);

    let numberOfDotOccurences = 0;

    if (e[0] === "x") {
      if (e.length === 1) return true;

      if ((e[1] !== "+" && e[1] !== "-") || e.length === 2) return false;

      for (let i = 2; i < e.length; i++) {
        if (
          (!isNumber(e[i]) && e[i] !== ".") ||
          (e[i] === "." && i === e.length)
        )
          return false;

        if (e[i] === ".") numberOfDotOccurences++;

        if (numberOfDotOccurences === 2) return false;
      }

      return true;
    }

    let firstNumberLength = 0;
    numberOfDotOccurences = 0;

    for (let i = 0; i < e.length; i++) {
      if (e[i] === "x") break;
      if (
        (!isNumber(e[i]) && e[i] !== ".") ||
        (e[i] === "." && e.length >= i + 2 && !isNumber(e[i + 1]))
      )
        return false;

      if (e[i] === ".") numberOfDotOccurences++;

      if (numberOfDotOccurences === 2) return false;

      firstNumberLength++;
    }

    if (e.length === firstNumberLength) return true;

    if (e[firstNumberLength] !== "x") return false;

    if (e.length === firstNumberLength + 1) return true;

    if (e.length === firstNumberLength + 2) return false;

    if (e[firstNumberLength + 1] !== "+" && e[firstNumberLength + 1] !== "-")
      return false;

    numberOfDotOccurences = 0;

    for (let i = firstNumberLength + 2; i < e.length; i++) {
      if ((!isNumber(e[i]) && e[i] !== ".") || (e[i] === "." && i === e.length))
        return false;

      if (e[i] === ".") numberOfDotOccurences++;

      if (numberOfDotOccurences === 2) return false;
    }

    return true;
  };

  if (!isValid()) return <></>;

  const SCALAR = 50;

  let expression = equation.replaceAll(" ", "").toLowerCase();

  if (expression[0] === "y") expression = expression.substring(2);
  else if (expression[1] === "(") expression = expression.substring(5);

  let slope = 0;
  let yIntersection = 0;
  let doesExpressionContainYIntersection = false;

  if (expression.includes("x")) {
    if (expression[0] === "x") {
      slope = 1;
      if (expression.length > 1) doesExpressionContainYIntersection = true;
    } else if (expression[0] === "+" && expression[1] === "x") {
      slope = 1;
      if (expression.length > 2) doesExpressionContainYIntersection = true;
    } else if (expression[0] === "-" && expression[1] === "x") {
      slope = -1;
      if (expression.length > 2) doesExpressionContainYIntersection = true;
    } else {
      let slopeString = "";
      for (let i = 0; i < expression.length; i++) {
        if (expression[i] === "x") break;
        slopeString += expression[i];
      }
      slope = Number(slopeString);
      if (expression.length > slopeString.length + 1)
        doesExpressionContainYIntersection = true;
    }
  } else doesExpressionContainYIntersection = true;

  if (doesExpressionContainYIntersection) {
    let yIntersectionString = "";
    for (let i = expression.length - 1; i >= 0; i--) {
      if (expression[i] === "x") break;
      yIntersectionString += expression[i];
    }
    yIntersectionString = yIntersectionString.split("").reverse().join("");
    yIntersection = Number(yIntersectionString);
  }

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
        transform: `translate(calc(-128px + ${dragXOffset}px), calc(50vh + ${totalOffset}px + ${dragYOffset}px)) rotate(${radiansToRotate}rad) scaleX(99)`,
      }}
    ></div>
  );
};

export default Graph;
