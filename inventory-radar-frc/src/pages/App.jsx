import React from 'react';
import Page1 from './Page1';
import Home from './Home';
import '../index.css'
import {Route, Routes} from "react-router-dom"

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/rahulCloset' element={<Page1 />}/>
      </Routes>
    </div>
  )
}

export default App
