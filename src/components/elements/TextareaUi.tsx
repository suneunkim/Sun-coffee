import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  id: string
  label: string
  disabled?: boolean
  register: UseFormRegisterReturn
  errors: FieldErrors
  [key: string]: any
}

const TextareaUi = ({ id, label, disabled, register, errors }: Props) => {
  return (
    <div className="">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        className={`
        text-sm focus:border-[#FFA16C] focus:outline-none focus:ring-1 focus:ring-[#FFA16C]
        ${errors[id] && 'text-rose-500'}`}
        placeholder="상품을 설명해주세요"
        id={id}
        disabled={disabled}
        {...register}
      />
    </div>
  )
}

export default TextareaUi
