import Button from '../elements/Button'

const Category = () => {
  return (
    <div className="w-[350px] flex gap-3">
      <Button category rounded label="Coffee" />
      <Button category rounded label="Non Coffee" />
      <Button category rounded label="Food" />
    </div>
  )
}

export default Category
