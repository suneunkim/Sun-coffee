import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useState } from 'react'

interface Props {
  onChange: (vaule: string) => void
  value: string
}

function InputFile({ onChange, value }: Props) {
  const userProfile = useCurrentUser()
  const [isUploaded, setisUploaded] = useState(false) // 파일 선택 중복 금지

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await ImageUpload(e.target.files[0])
    }
  }

  const ImageUpload = async (file: File) => {
    const imageRef = ref(storage, `${userProfile?.uid}/${file.name}`)
    await uploadBytes(imageRef, file)
    const downloadURL = await getDownloadURL(imageRef)
    onChange(downloadURL)
    setisUploaded(true)
  }

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input
        disabled={isUploaded}
        onChange={handleFileSelect}
        id="picture"
        type="file"
      />
      {value && (
        <div className="flex justify-center ">
          <img className="w-[300px] rounded-lg" src={value} />
        </div>
      )}
    </div>
  )
}
export default InputFile
