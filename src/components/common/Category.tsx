import { Link, useMatch } from 'react-router-dom'
import Button from '../elements/Button'

interface Props {
  to: any
  label: any
}

const Category = () => {
  return (
    <div className="w-[350px] flex gap-3">
      <CategoryButton to="/coffee" label="Coffee" />
      <CategoryButton to="/non-coffee" label="Non Coffee" />
      <CategoryButton to="/food" label="Food" />
    </div>
  )
}

const CategoryButton = ({ to, label }: Props) => {
  const match = useMatch(to)

  return (
    <Link to={to} className="w-full ">
      <button
        className={`
      bg-white border-gray-200 border-[1px] rounded-full text-gray-700 hover:bg-gray-100
      my-2 w-full p-3 transition hover:opacity-80
      disabled:cursor-not-allowed
      disabled:opacity-70 py-3 text-sm
      ${match && 'bg-gray-200'}
      `}
      >
        {label}
      </button>
    </Link>
  )
}
export default Category

{
  /* <Button category rounded label={label} match={match} /> */
}
