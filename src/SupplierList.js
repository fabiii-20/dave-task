import React from 'react'

export default function SupplierList({suppliers}) {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{suppliers && suppliers.map(supplier =>  <li key={supplier.source_id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    <div className="flex w-full items-center justify-between space-x-6 p-6">
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <h3 className="truncate text-sm font-medium text-gray-900">{supplier.state}</h3>
          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            {supplier.channel}
          </span>
        </div>
        <p className="mt-1  text-xs text-gray-500">{supplier.request_description}</p>
        <p className='mt-1 truncate text-sm text-gray-500'>{supplier.source_time}</p>
        <p className="mt-1 text-sm text-gray-500 font-semibold">{supplier.category}</p>
      </div>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200">
        
        <div className="-ml-px flex w-0 flex-1">
          <a
            href={`tel:${supplier?.contact_numbers[0]}`}
            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
          >
            Call: {supplier?.contact_numbers?.[0]}
          </a>
        </div>
      </div>
    </div>
  </li>)}</ul>
  )
}