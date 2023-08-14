import IGraph from "@/types";
import { FaXmark, FaEye, FaEyeSlash } from "react-icons/fa6";
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
        placeholder="y=mx±b"
        className="bg-gray-900 outline-none w-2/3 text-gray-200 placeholder:text-gray-600 border-b-2 border-b-gray-800 transition-colors focus:border-b-blue-500"
      />
      <button onClick={toggleThisVisibility}>
        {slot.isShown ? (
          <FaEye className="text-gray-400" />
        ) : (
          <FaEyeSlash className="text-gray-500" />
        )}
      </button>
      <button onClick={deleteThisSlot}>
        <FaXmark className="text-red-500" />
      </button>
    </div>
  );
};

export default Slot;
