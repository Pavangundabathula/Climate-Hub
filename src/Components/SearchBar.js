import React from 'react'

const SearchBar = ({items}) => {
  return (
    <div className='border-2 rounded-lg border-gray-500 ml-10 h-auto w-[300px] text-center'>
      <div className='font-poppins capitalize font-medium text-white'>
        Search History
      </div>
      <hr className='border-b-1 border-gray-500'/>
      {items.map(element => (
        <div className='text-2xl capitalize font-poppins text-white'>
            {element}
        </div>
      ))}
    </div>
  )
}

export default SearchBar
