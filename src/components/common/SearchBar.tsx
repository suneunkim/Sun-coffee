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
        <div className="flex flex-col relative w-full">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-xl pl-8 w-full focus:border-gray-300"
          />
          {/* <div className="absolute top-10 bg-white">
            <ul className="h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm flex flex-col gap-2">
              <li>수플레 치즈 케이크</li>
              <li>밀크레이프 케이크</li>
              <li>떠먹는 티라미수</li>
              <li>아메리카노</li>
            </ul>
          </div> */}
        </div>
        <Button className="bg-[#FFA16C] absolute right-0 rounded-xl">
          <PiCoffeeLight className="mr-2 w-5 h-5" />
          <p>Filter</p>
        </Button>
      </div>
    </form>
  )
}

export default React.memo(SearchBar)
