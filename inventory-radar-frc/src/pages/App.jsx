import React from 'react';
import Page1 from './Page1';
import Home from './Home';
import '../index.css'
import {Route, Routes} from "react-router-dom"
import Old_closet from './Old_closet';
import Storage_closet from './Storage_closet';
import BAM_closet from './BAM_closet';

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/rahulCloset' element={<Page1 />}/>
        <Route path='/storageRoom' element={<Storage_closet />}/>
        <Route path='/oldCloset' element={<Old_closet />}/>
        <Route path='/bamCloset' element={<BAM_closet />}/>


      </Routes>
    </div>
  )
}

export default App
