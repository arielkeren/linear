interface Props {
  addSlot: () => void;
}

const AddSlotButton: React.FC<Props> = ({ addSlot }) => {
  return (
    <button
      onClick={addSlot}
      className="w-full h-12 text-3xl text-blue-500 border-2 border-blue-500 transition-colors hover:bg-blue-500 hover:text-gray-900"
    >
      +
    </button>
  );
};

export default AddSlotButton;
