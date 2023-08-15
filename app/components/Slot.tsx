import IGraph from "@/types";
import { FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaExclamationTriangle } from "react-icons/fa";
import { HiMiniEllipsisHorizontalCircle } from "react-icons/hi2";

interface Props {
  slot: IGraph;
  index: number;
  changeSlot: (slotIndex: number, newSlot: string) => void;
  deleteSlot: (slotIndex: number) => void;
  toggleVisibility: (slotIndex: number) => void;
  openMenu: (slotIndex: number) => void;
}

const Slot: React.FC<Props> = ({
  slot,
  index,
  changeSlot,
  deleteSlot,
  toggleVisibility,
  openMenu,
}) => {
  const changeThisSlot = (event: React.ChangeEvent<HTMLInputElement>) =>
    changeSlot(index, event.target.value);

  const deleteThisSlot = () => deleteSlot(index);

  const toggleThisVisibility = () => toggleVisibility(index);

  const openThisMenu = () => openMenu(index);

  const isAlphabetical = (character: string) =>
    character.toLowerCase() !== character.toUpperCase();

  const isNumber = (character: string) => character >= "0" && character <= "9";

  const isValid = () => {
    let e = slot.equation.replaceAll(" ", "").toLowerCase();

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

  return (
    <div className="flex justify-between items-center w-full">
      <button onClick={openThisMenu}>
        <HiMiniEllipsisHorizontalCircle
          className="text-xl"
          style={{ color: slot.color }}
        />
      </button>
      <input
        value={slot.equation}
        onChange={changeThisSlot}
        placeholder="y=mx+b"
        className="bg-gray-900 outline-none w-2/3 text-gray-200 placeholder:text-gray-600 border-b-2 border-b-gray-800 transition-colors focus:border-b-blue-500"
      />

      {isValid() ? (
        <button onClick={toggleThisVisibility}>
          {slot.isShown ? (
            <FaEye className="text-gray-400" />
          ) : (
            <FaEyeSlash className="text-gray-500" />
          )}
        </button>
      ) : (
        <FaExclamationTriangle className="text-red-400" />
      )}

      <button onClick={deleteThisSlot}>
        <FaXmark className="text-red-500" />
      </button>
    </div>
  );
};

export default Slot;
