import React from 'react'

export default function SupplierList({suppliers}) {
  return (
    <div>{suppliers.map(supplier => <>
    {supplier.category}
    </>)}</div>
  )
}
