import React from 'react'

const home = () => {
  return (
    <div className='body'>
      <h1>Hello</h1>
      <div>
        <div>
          <button><a href={"/page1"}>Button 1</a></button>
          <button>Button 2</button>
        </div>
        <div>
          <button>Button 3</button>
          <button>Button 4</button>
        </div>
      </div>
    </div>
  )
}

export default home