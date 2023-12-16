import React, { FC } from 'react'
import { Search } from 'react-ionicons'
interface headerType {
    searchValue: (query: string) => void;
}
const Header: FC<headerType> = ({ searchValue }) => {
    return (
        <div className='w-full h-28 flex items-center pl-10'>
            <h1 className='text-base md:text-2xl lg:text-3xl xl:text-4xl text-black font-poppins'>Payouts</h1>
            <div className='w-2/6 h-1/2 rounded-lg ml-52 border items-center flex p-6 justify-between'>
                <input placeholder='Search Payouts' className='text-base md:text-xm lg:text-sm xl:text-md text-black border-none outline-none font-poppins' onChange={(event) => searchValue(event.target.value)} />
                <Search
                    color={'gray'}
                    height="15px"
                    width="15px"
                    onClick={() => alert('Hi!')}
                />
            </div>
        </div>
    )
}

export default Header