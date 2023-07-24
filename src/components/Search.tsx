import React, { lazy, startTransition, useState } from 'react'
import SearchIcon from './icons/SearchIcon'

const SearchPopup = lazy(() => import("./Popups/SearchPopup"));

function Search() {
  const [fetch, setFetch] = useState(false)
  
  return (
    <>
      <div className='flex items-center' onClick={() => startTransition(() => {setFetch(true)})}>
          <SearchIcon />
          <div className='ml-6 hidden lg:block text-lg text-[#535353]'>
              Search for anything...
          </div>
      </div>

      {fetch && <SearchPopup show={fetch} setShow={setFetch}  />}
    </>
  )
}

export default React.memo(Search)