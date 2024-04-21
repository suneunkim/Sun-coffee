interface ButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  outline?: boolean // 흰 버튼에 테두리
  small?: boolean
  rounded?: boolean
  cart?: boolean
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  rounded,
  cart,
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
      py-3
      text-sm
      border-2 border-[#FFA16C]
      bg-[#FFA16C] text-zinc-50
      ${rounded ? 'rounded-3xl' : 'rounded-md'}
      ${small && 'py-[6px] px-0 my-0'}
      ${cart && 'my-0 py-2 font-semibold text-lg'}
      ${outline && 'text-gray-800  hover:text-white'}
      ${outline && 'bg-white hover:bg-gray-900 '}
      ${outline && 'border-gray-200 border-[1px]'}
      ${outline && 'py-[0.6rem]'}
    `}
    >
      {label}
    </button>
  )
}

export default Button

// ${outline ? 'border-1 border-[#3c3c3c]' : 'border-[#FFA16C]'}
// ${outline ? 'bg-white' : 'bg-[#FFA16C]'}
// ${outline ? 'text-[#FFA16C]' : 'text-zinc-50'}
