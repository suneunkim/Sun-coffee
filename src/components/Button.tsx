interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  outline: boolean // 흰 버튼에 테두리
  small?: boolean
  rounded?: boolean
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  rounded,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
      my-5
      w-full
      p-3
      transition
      hover:opacity-80
      disabled:cursor-not-allowed
      disabled:opacity-70
      ${rounded ? 'rounded-3xl' : 'rounded-md'}
      ${outline ? 'border border-[#FFA16C]' : 'border-[#FFA16C]'}
      ${outline ? 'bg-white' : 'bg-[#FFA16C]'}
      ${outline ? 'text-[#FFA16C]' : 'text-zinc-50'}
      ${small ? 'text-xs' : 'text-sm'}
      ${small ? 'py-2' : 'py-3'}
      ${small ? 'border-[1px]' : 'border-2'}
    `}
    >
      {label}
    </button>
  )
}

export default Button
