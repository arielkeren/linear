import { FaXmark } from "react-icons/fa6";
import ColorButton from "./ColorButton";
import ThicknessSlider from "./ThicknessSlider";
import FieldsController from "./FieldsController";

interface Props {
  closeMenu: () => void;
  openSlotIndex: number;
  availableColors: string[];
  color: string;
  thickness: number;
  changeColor: (newColor: string) => void;
  changeThickness: (newThickness: number) => void;
  changeSlot: (slotIndex: number, newSlot: string) => void;
}

const Menu: React.FC<Props> = ({
  closeMenu,
  openSlotIndex,
  availableColors,
  color,
  thickness,
  changeColor,
  changeThickness,
  changeSlot,
}) => {
  const changeThisSlot = (newSlot: string) =>
    changeSlot(openSlotIndex, newSlot);

  return (
    <div className="h-screen w-screen absolute bg-opacity-50 bg-black z-20 flex justify-center items-center">
      <div className="h-1/2 w-5/6 bg-gray-900 relative flex flex-col justify-center items-center gap-2 p-6 sm:w-2/3 lg:w-1/2">
        <button onClick={closeMenu} className="absolute top-2 right-2">
          <FaXmark className="text-red-500 text-2xl" />
        </button>

        <h2 className="uppercase text-gray-200 text-2xl">Color</h2>
        <div className="flex gap-2 mb-6">
          {availableColors.map((availableColor) => (
            <ColorButton
              availableColor={availableColor}
              color={color}
              changeColor={changeColor}
              key={availableColor}
            />
          ))}
        </div>

        <h2 className="uppercase text-gray-200 text-2xl">Thickness</h2>
        <ThicknessSlider
          thickness={thickness}
          changeThickness={changeThickness}
        />

        <h2 className="uppercase text-gray-200 text-2xl -mb-3">
          Calculate Equation
        </h2>
        <h3 className="uppercase text-gray-300">Fill out 2 fields</h3>
        <FieldsController changeSlot={changeThisSlot} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default Menu;
