import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface InputProps {
  id: string
  label: string
  type: string
  disabled?: boolean
  formatPrice?: boolean
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors: FieldErrors
  textarea?: boolean
  [key: string]: any
}

const InputUi = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  required,
  errors,
  textarea,
  ...rest
}: InputProps) => {
  return (
    <div className="py-1">
      <Label
        className={`
      ${errors[id] && 'text-rose-500'}
      `}
        htmlFor={id}
      >
        {label}
      </Label>
      <Input
        id={id}
        disabled={disabled}
        {...register(id, { required: true })}
        type={type}
      />
    </div>
  )
}

export default InputUi
