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
    numbers.push(i / Math.pow(2, Math.floor(Math.log2(scalar) - 6)));
  }

  const formatNumber = (number: number) => {
    if ((number > 0.1 && number < 1000) || (number < -0.1 && number > -1000))
      return Math.round(number * 100) / 100;
    return Math.round(Math.log10(Math.abs(number)) * 100) / 100;
  };

  return (
    <>
      {numbers.map((number, index) => (
        <Fragment key={`${number}-${index}`}>
          <span
            className="text-gray-300 absolute z-10 select-none text-xs"
            style={{
              transform: `translate(calc(50vw - ${
                128 - dragXOffset - 7
              }px), calc(50vh - ${number * scalar - dragYOffset + 7}px))`,
            }}
          >
            {(number > 0.1 && number < 1000) ||
            (number < -0.1 && number > -1000) ? (
              formatNumber(number)
            ) : (
              <>
                {number < 0 && "-"}10<sup>{formatNumber(number)}</sup>
              </>
            )}
          </span>

          <span
            className="text-gray-300 absolute z-10 select-none text-xs"
            style={{
              transform: `translate(calc(50vw - ${
                128 - dragXOffset - number * scalar + (number < 0 ? 10 : 0)
              }px), calc(50vh + ${dragYOffset + 5}px))`,
            }}
          >
            {(number > 0.1 && number < 1000) ||
            (number < -0.1 && number > -1000) ? (
              formatNumber(number)
            ) : (
              <>
                {number < 0 && "-"}10<sup>{formatNumber(number)}</sup>
              </>
            )}
          </span>
        </Fragment>
      ))}
    </>
  );
};

export default Numbers;
