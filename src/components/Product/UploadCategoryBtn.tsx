import { Button } from '@/components/ui/button'

interface Props {
  category: string
  setCategory: (category: string) => void
  isActive: boolean
}

const UploadCategoryBtn = ({ category, setCategory, isActive }: Props) => {
  return (
    <Button
      className={`
      rounded-3xl border text-gray-800 hover:text-white hover:bg-gray-800
      ${isActive ? 'bg-gray-800 text-white' : 'bg-white'}
      `}
      onClick={() => setCategory(category)}
      type="button"
    >
      {category}
    </Button>
  )
}

export default UploadCategoryBtn
