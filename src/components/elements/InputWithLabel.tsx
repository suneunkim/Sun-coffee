import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputProps {
  id: string
  label: string
  type: string
  disabled?: boolean
  formatPrice?: boolean
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
  checkbox,
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
      <div className="relative flex items-center">
        <Input
          className={`
        ${checkbox && 'w-4'}
        ${formatPrice && 'pl-8'}
        focus:border-[#FFA16C] focus:outline-none focus:ring-1 focus:ring-[#FFA16C]
        `}
          id={id}
          disabled={disabled}
          {...register}
          type={type}
        />
        {formatPrice && (
          <span className="absolute left-3 text-sm text-gray-600">₩</span>
        )}
      </div>
    </div>
  )
}

export default InputUi
