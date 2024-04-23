interface Props {
  label: string
}

const CountButton = ({ label }: Props) => {
  return (
    <div className="w-7 aspect-square border border-gray-300 rounded-full flex justify-center items-center text-xl">
      {label}
    </div>
  )
}

export default CountButton
