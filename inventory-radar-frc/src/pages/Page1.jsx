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
  setName("")
}

  async function refresh() {
    const qDcaf = query(collection(db, "dcaf"))
    const querySnapshot = await getDocs(qDcaf)
    let updatedPartsList = [...partsList];

    // querySnapshot.forEach(doc => {
    //   const docData2 = doc.data()
    //   console.log(docData2.name)
    // })

    querySnapshot.forEach(doc => {
      const docData = doc.data();
      var dup = false;


      for (var i = 0; i < updatedPartsList.length; i++) {
        if (updatedPartsList[i].name === docData.name) {
          dup = true;
        }
      }

      if (!dup && docData.name !== undefined ) {
        var newPartList = {
          name: docData.name,
          id: uuidv4(),
        }
        

        updatedPartsList.push(newPartList);

        console.log(newPartList)
      }


    })

    setPartsList(updatedPartsList);


}
  
  return (
    <div>
      <input placeholder='Item Name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <button onClick={nameSubmit}>Submit</button>
      <button onClick={refresh}>Refresh</button>

      {partsList.map(part => 
      <li key={part.id}>
        {part.name}
      </li>)}


      
    </div>
  )
}

export default Page1
