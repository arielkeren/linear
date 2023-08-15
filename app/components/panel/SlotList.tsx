import IGraph from "@/types";
import Slot from "./Slot";

interface Props {
  slots: IGraph[];
  changeSlot: (slotIndex: number, newSlot: string) => void;
  deleteSlot: (slotIndex: number) => void;
  toggleVisibility: (slotIndex: number) => void;
  openMenu: (slotIndex: number) => void;
}

const SlotList: React.FC<Props> = ({
  slots,
  changeSlot,
  deleteSlot,
  toggleVisibility,
  openMenu,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full px-2">
      {slots.map((slot, index) => (
        <Slot
          slot={slot}
          index={index}
          changeSlot={changeSlot}
          deleteSlot={deleteSlot}
          toggleVisibility={toggleVisibility}
          openMenu={openMenu}
          key={index}
        />
      ))}
    </div>
  );
};

export default SlotList;
