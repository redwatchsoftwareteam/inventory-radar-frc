import React from 'react'

const home = () => {
  return (
    <div className='container  w-screen font-Poppins '>
      <div className='text-center pb-[30px] font-poppins'>
        <h1>Red Watch's Inventory</h1>
      </div>
      <div className='grid grid-cols-2 gap-[40px] place-items-center'>
            <div>
              <button><a href={"/rahulCloset"}>Rahul's Closet (Metalshop)</a></button>
            </div>
            <div>
              <button><a href={'/storageRoom'}>Storage Room (Metalshop)</a></button>
            </div>
            <div>
              <button><a href={'/oldCloset'}>Old Closet (D100)</a></button>
            </div>
            <div>
              <button><a href={'/bamCloset'}>BAM Closet (D100)</a></button>
            </div>
      </div>
      
    </div>
  )
}

export default home