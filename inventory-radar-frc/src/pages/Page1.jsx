import React from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, doc, getDocs, query} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';


const Page1 = () => {

const [name, setName] = useState("")
const [partsList, setPartsList] = useState([])




function nameSubmit() {
  addDoc(collection(db, "dcaf"), {
    name: name,
  });
}

  async function refresh() {
    const qDcaf = query(collection(db, "dcaf"))
    const querySnapshot = await getDocs(qDcaf)

    querySnapshot.forEach(doc => {
      const docData = doc.data();
      var dup = false;

      for (var i = 0; i < partsList.length; i++) {
        if (partsList[i] === docData.name) {
          dup = true;
        }
      }

      if (!dup) {
        partsList.push(docData.name)
      }

    })
    console.log(partsList)

}
  
  return (
    <div>
      <input placeholder='Item Name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={nameSubmit}>Submit</button>
      <button onClick={refresh}>Refresh</button>

      {partsList.map(part => 
    <li key={part.id}>
      <p>{part.name}</p>
    </li>)}


      
    </div>
  )
}

export default Page1