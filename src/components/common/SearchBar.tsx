import { CiSearch } from 'react-icons/ci'
import { PiCoffeeLight } from 'react-icons/pi'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import React from 'react'

const SearchBar = () => {
  return (
    <form className="py-5">
      <div className="flex items-center relative w-[450px]">
        <CiSearch className="absolute left-2" />
        <Input
          type="text"
          placeholder="Search"
          className="rounded-xl pl-8 w-[98%] focus:border-gray-300"
        />
        <Button className="bg-[#FFA16C] absolute right-0 rounded-full">
          <PiCoffeeLight className="mr-2 w-5 h-5" />
          Filter
        </Button>
      </div>
    </form>
  )
}

export default React.memo(SearchBar)
