import { FaXmark } from "react-icons/fa6";
import ColorButton from "./ColorButton";
import ThicknessSlider from "./ThicknessSlider";

interface Props {
  closeMenu: () => void;
  availableColors: string[];
  color: string;
  thickness: number;
  changeColor: (newColor: string) => void;
  changeThickness: (newThickness: number) => void;
}

const Menu: React.FC<Props> = ({
  closeMenu,
  availableColors,
  color,
  thickness,
  changeColor,
  changeThickness,
}) => {
  return (
    <div className="h-screen w-screen absolute bg-opacity-50 bg-black z-10 flex justify-center items-center">
      <div className="h-2/3 w-2/3 bg-gray-900 relative flex flex-col items-center gap-2 p-6">
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
      </div>
    </div>
  );
};

export default Menu;
