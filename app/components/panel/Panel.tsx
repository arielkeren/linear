import IGraph from "@/types";
import AddSlotButton from "./AddSlotButton";
import Logo from "./Logo";
import SlotList from "./SlotList";

interface Props {
  slots: IGraph[];
  addSlot: () => void;
  changeSlot: (slotIndex: number, newSlot: string) => void;
  deleteSlot: (slotIndex: number) => void;
  toggleVisibility: (slotIndex: number) => void;
  openMenu: (slotIndex: number) => void;
}

const Panel: React.FC<Props> = ({
  slots,
  addSlot,
  changeSlot,
  deleteSlot,
  toggleVisibility,
  openMenu,
}) => {
  return (
    <div className="h-screen w-64 bg-gray-900 flex flex-col items-center gap-6 z-10">
      <Logo />
      <SlotList
        slots={slots}
        changeSlot={changeSlot}
        deleteSlot={deleteSlot}
        toggleVisibility={toggleVisibility}
        openMenu={openMenu}
      />

      {slots.length < 10 ? (
        <AddSlotButton addSlot={addSlot} />
      ) : (
        <p className="text-gray-700">Max graphs reached</p>
      )}
    </div>
  );
};

export default Panel;
