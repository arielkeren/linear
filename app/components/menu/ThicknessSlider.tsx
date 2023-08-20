interface Props {
  thickness: number;
  changeThickness: (newThickness: number) => void;
}

const ThicknessSlider: React.FC<Props> = ({ thickness, changeThickness }) => {
  const changeThisThickness = (event: React.ChangeEvent<HTMLInputElement>) =>
    changeThickness(Number(event.target.value));

  return (
    <input
      type="range"
      min="5"
      max="25"
      step="any"
      value={thickness}
      onChange={changeThisThickness}
      className="h-1 bg-gray-700 accent-blue-500 rounded-lg appearance-none cursor-pointer w-5/12 mb-6"
    />
  );
};

export default ThicknessSlider;
