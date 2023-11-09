
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'


export default function FiltersAndPagination({
    filters,setFilters,page,setPage,isLastPage,allFilters
}) {
    const EachFilter = ({name,filter}) => {
    
        return (
          <div>
            <h1 className='text-lg font-semibold text-gray-600 uppercase'>{name}</h1>
              <select value={filters[name]}
            id="location"
            name="location"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Canada"
            onChange={(e) =>setFilters({...filters,[name]:e.target.value})}
            // onSelect={(e) => console.log(e.target.v)}
          >
                {Object.keys(filter).filter(i => i!=="" && i!=="null").map((key) =>  { 
                    return (
                        <option value={key} key={key} className='flex gap-2 items-center'>
                            {key} - ({filter[key]})
                        </option>
                    )
                })}
                </select>
          </div>
        )
    }
  return (
    <div className='bg-gray-50 rounded-lg px-4 py-2'>
        <button disabled={page<=1} onClick={() => setPage(page-1)} className='bg-gray-200 disabled:bg-gray-100 disabled:cursor-none  rounded-lg p-2 m-2'><ChevronLeftIcon className='w-6 h-6' /></button>
        Page : {page}
        <button disabled={isLastPage} onClick={() => setPage(page+1)} className='bg-gray-200 disabled:bg-gray-100 disabled:cursor-none rounded-lg p-2 m-2'><ChevronRightIcon className='w-6 h-6' /></button>
        <button onClick={() => {
            setFilters({
                category:"",
                channel:"",
                state:""
            })
            setPage(1)
        }} className='bg-gray-200 rounded-lg p-2 m-2'>Reset Filters</button>
        {allFilters && <EachFilter filter={allFilters?.category} name="category" />}
        {allFilters && <EachFilter filter={allFilters?.channel} name="channel" />}
        {allFilters && <EachFilter filter={allFilters?.state} name="state" />}

    </div>
  )
}