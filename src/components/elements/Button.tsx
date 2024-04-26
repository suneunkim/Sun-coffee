interface ButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  outline?: boolean // 흰 버튼에 테두리
  small?: boolean
  rounded?: boolean
  cart?: boolean
  category?: boolean
  textWhite?: boolean
  match?: boolean
  [key: string]: any
}

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  rounded,
  cart,
  category,
  textWhite,
  match,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
      my-2
      w-full
      p-3
      transition
      hover:opacity-80
      disabled:cursor-not-allowed
      disabled:opacity-70
      py-3
      text-sm
      border-2 border-[#FFA16C]
      bg-[#FFA16C]
      ${textWhite && 'text-zinc-50'}
      ${rounded ? 'rounded-3xl' : 'rounded-md'}
      ${small && 'py-[8px] my-0 w-20'}
      ${cart && 'my-0 py-2 text-lg'}
      ${outline && 'text-gray-800  hover:text-white'}
      ${outline && 'bg-white hover:bg-gray-900 '}
      ${outline && 'border-gray-200 border-[1px]'}
      ${outline && 'py-[0.6rem]'}
      ${
        category &&
        'bg-white border-gray-200 border-[1px] text-gray-700 hover:bg-gray-100'
      }
      ${match ? 'bg-[#FFA16C]' : ''}
    `}
    >
      {label}
    </button>
  )
}

export default Button
