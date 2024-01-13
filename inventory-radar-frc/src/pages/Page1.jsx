import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, documentId, getDocs, onSnapshot, query, setDoc, where} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';



const Page1 = () => {

const [name, setName] = useState("")
const [quan, setQuan] = useState(0)
const [partsList, setPartsList] = useState([])

useEffect(() => {
  console.log("test")
})

async function removeItem(partName) {
  console.log(partName)
  const q = query(collection(db, "dcaf"), where("name", "==", partName));
  const querySnapshot = await getDocs(q);
  var docId;
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    docId = doc.id; // Get the document ID
    
  });

  await deleteDoc(doc(db, "dcaf", docId));
 }


function nameSubmit() {
  addDoc(collection(db, "dcaf"), {
    name: name,
    quan: quan
  });
  setName("")
  setQuan(0)
}

  async function refresh() {

    const qDcaf = query(collection(db, "dcaf"))

    onSnapshot(qDcaf, {includeMetadataChanges:true}, (snapshot) =>
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New match: ", change.doc.data())
        }
        const source = snapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source)}))

       

    const querySnapshot = await getDocs(qDcaf)
    let updatedPartsList = [partsList];

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
          quan: docData.quan,
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
      <input placeholder='Quantity' type='number' value={quan} onChange={(e) => setQuan(e.target.value)}></input>

      <button onClick={nameSubmit}>Submit</button>
      <button onClick={refresh}>Refresh</button>

      <div className='flex flex-row'>
        {partsList.map(part => 
        <div className="flex flex-row" key={part.id}>
        
          <div>
            Name: {part.name}
          </div>

          <div>
            Quantity: {part.quan}
          </div>

          <button onClick={() => removeItem(part.name)}>Remove</button>
        </div>)}
      </div>

      
    </div>
  )
}

export default Page1
