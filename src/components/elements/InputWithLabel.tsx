import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputProps {
  id: string
  label: string
  type: string
  disabled?: boolean
  formatPrice?: boolean
  //register: <T extends string>(name: T, options?: RegisterOptions<FieldValues, T>) => any
  register: UseFormRegisterReturn
  errors: FieldErrors
  textarea?: boolean
  checkbox?: boolean
  [key: string]: any
}

const InputUi = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  errors,
  textarea,
  checkbox,
  ...rest
}: InputProps) => {
  return (
    <div
      className={`
      p-1
      ${checkbox && 'flex justify-end items-center space-x-2'}
      `}
    >
      <Label
        className={`
      ${errors[id] && 'text-rose-500'}
      `}
        htmlFor={id}
      >
        {label}
      </Label>
      <Input
        className={`
      ${checkbox && 'w-4'}
      focus:border-[#FFA16C] focus:outline-none focus:ring-1 focus:ring-[#FFA16C]
      `}
        id={id}
        disabled={disabled}
        {...register}
        type={type}
      />
    </div>
  )
}

export default InputUi
