import TextInput from './../elements/TextInput'

interface Props {
  register: any
  setValue: any
  errors: any
}

const SearchAddress = ({ register, setValue, errors }: Props) => {
  const handleComplete = (data: any) => {
    setValue('postcode', data.zonecode)
    setValue('address', data.address)
  }

  const handleClick = () => {
    // 주소 검색창
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <TextInput
          id="postcode"
          type="number"
          label="우편번호"
          register={register}
          errors={errors}
          errorMsg={errors.email?.message}
        />
        <button
          className="w-48 p-[10px] mb-1 border text-sm mt-auto bg-slate-400 text-white rounded-lg hover:bg-slate-500"
          onClick={handleClick}
        >
          우편번호 찾기
        </button>
      </div>
      <div>
        <TextInput
          id="address"
          type="text"
          label="주소"
          register={register}
          errors={errors}
          errorMsg={errors.email?.message}
        />
        <TextInput
          id="detailaddress"
          type="text"
          label="상세 주소"
          register={register}
          errors={errors}
          errorMsg={errors.email?.message}
        />
      </div>
    </>
  )
}

export default SearchAddress
