interface Props {
  label: string;
  placeholder: string;
  value: string;
  changeValue: (newValue: string) => void;
}

const Field: React.FC<Props> = ({ label, placeholder, value, changeValue }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    changeValue(event.target.value);

  return (
    <div className="flex gap-2">
      <label htmlFor={label} className="text-gray-300 uppercase">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={label}
        className="bg-gray-900 outline-none w-1/3 text-gray-200 placeholder:text-gray-600 border-b-2 border-b-gray-800 transition-colors focus:border-b-blue-500"
      />
    </div>
  );
};

export default Field;
