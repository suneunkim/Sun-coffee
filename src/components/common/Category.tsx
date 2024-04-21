import Button from '../elements/Button'

const Category = () => {
  return (
    <div className="w-[60%] flex gap-3">
      <Button category rounded label="Coffee" />
      <Button category rounded label="Non Coffee" />
      <Button category rounded label="Food" />
    </div>
  )
}

export default Category
