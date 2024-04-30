interface Props {
  label: string
  [key: string]: any
}

const CountButton = ({ label, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className="w-7 aspect-square border border-gray-300 rounded-full flex justify-center items-center text-xl"
    >
      {label}
    </button>
  )
}

export default CountButton
