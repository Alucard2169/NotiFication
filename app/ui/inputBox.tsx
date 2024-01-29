import { ChangeEvent } from "react";

interface InputBoxProps {
  id: string;
  content: string;
  type: string;
  required: boolean;
  name: string;
  value: string;
  handleValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  id,
  content,
  type,
  required,
  name,
  value,
  handleValue,
}: InputBoxProps) => {


  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="text-md font-bold text-gray-400">{content}</span>
      <input
        type={type}
        id={id}
        name={name}
        className={`outline-none p-2 ${
          name === "password" ? "pr-14" : ""
        } bg-transparent text-white border border-white rounded-md focus-within:border-0 focus-within:border-b-2`}
        required={required}
        value={value}
        onChange={handleValue}
      />

    </label>
  );
};

export default InputBox;
