import { FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputProps {
  id: string;
  label: string;
  type: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: any;
  errors: FieldErrors;
  textarea?: boolean;
  checkbox?: boolean;
  [key: string]: any;
}

const TextInput = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  errors,
  checkbox,
  errorMsg,
}: InputProps) => {
  return (
    <div
      className={`
      p-1
      w-full
      ${checkbox && "flex justify-end items-center space-x-2"}
      `}
    >
      <Label
        className={`
      ${errors[id] && "text-rose-500"}
      `}
        htmlFor={id}
      >
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          className={`
        ${checkbox && "w-4"}
        ${formatPrice && "pl-8"}
        focus:border-[#FFA16C] focus:outline-none focus:ring-1 focus:ring-[#FFA16C]
        `}
          id={id}
          disabled={disabled}
          {...register(id, { required: true })}
          type={type}
        />
        {errorMsg && <p>{errorMsg}</p>}
        {formatPrice && (
          <span className="absolute left-3 text-sm text-gray-600">₩</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
