import { Fragment } from "react";

interface Props {
  scalar: number;
  dragXOffset: number;
  dragYOffset: number;
}

const Numbers: React.FC<Props> = ({ scalar, dragXOffset, dragYOffset }) => {
  const numbers = [];
  for (let i = -100; i <= 100; i++) {
    if (i === 0) continue;
    numbers.push(i / Math.pow(2, Math.floor(Math.log2(scalar) - 7)));
  }

  const shouldNumberBeShortened = (number: number) =>
    !(
      (number >= 0.01 && number <= 10000) ||
      (number <= -0.01 && number >= -10000)
    );

  const formatNumber = (number: number) => Math.round(number * 1000) / 1000;

  const getCoefficient = (number: number) =>
    number.toExponential(2).split("e")[0];

  const getExponent = (number: number) =>
    Number(number.toExponential().split("e")[1]);

  return (
    <>
      {numbers.map((number, index) => (
        <Fragment key={`${number}-${index}`}>
          <span
            className="text-gray-300 absolute z-10 select-none text-xs font-bold"
            style={{
              transform: `translate(calc(50vw - ${
                128 - dragXOffset - 7
              }px), calc(50vh - ${number * scalar - dragYOffset + 7}px))`,
            }}
          >
            {shouldNumberBeShortened(number) ? (
              <>
                {getCoefficient(number)} ⋅ 10<sup>{getExponent(number)}</sup>
              </>
            ) : (
              formatNumber(number)
            )}
          </span>

          <span
            className="text-gray-300 absolute z-10 select-none text-xs font-bold"
            style={{
              transform: `translate(calc(50vw - ${
                128 - dragXOffset - number * scalar + (number < 0 ? 10 : 0)
              }px), calc(50vh + ${dragYOffset + 5}px))`,
            }}
          >
            {shouldNumberBeShortened(number) ? (
              <>
                {getCoefficient(number)} ⋅ 10<sup>{getExponent(number)}</sup>
              </>
            ) : (
              formatNumber(number)
            )}
          </span>
        </Fragment>
      ))}
    </>
  );
};

export default Numbers;
