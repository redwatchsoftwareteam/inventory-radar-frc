import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, documentId, getDocs, onSnapshot, query, setDoc, updateDoc, where} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';



const Page1 = () => {

const [name, setName] = useState("")
const [quan, setQuan] = useState(0)
const [newQuan, setNewQuan] = useState(0)

const storedData = window.localStorage.getItem('dcafData');
const parsedDataBeta = storedData ? JSON.parse(storedData) : {};
const initPartsList = parsedDataBeta.partsList || [];
const [partsList, setPartsList] = useState(initPartsList)

// Load data from local storage when the component mounts
useEffect(() => {
    
  const storedData = window.localStorage.getItem('dcafData');
  
  if (storedData) {
    const parsedDataBeta = JSON.parse(storedData);
    console.log(parsedDataBeta)
    // Set the state with the data retrieved from local storage
    setPartsList(parsedDataBeta.partsList || '')
    
    
  }
}, []);

// Save data to local storage whenever the relevant state changes
useEffect(() => {
  const dataToStore = {
    partsList
    
    // ... other state variables ...
  };


  window.localStorage.setItem('dcafData', JSON.stringify(dataToStore));
}, [partsList /* ... other state variables ... */]);


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

 async function changeQuan(id) {
  console.log(newQuan)
  await updateDoc(doc(db, 'dcaf', id), {
    quan: newQuan.toString()
  })

  for (var i = 0; i < partsList.length; i++) {
    if (partsList[i].id == id){
      partsList[i].quan = newQuan
    }
  }

  setQuan("")
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
      console.log(doc.id)
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
          id: doc.id,
        }
        

        updatedPartsList.push(newPartList);

        console.log(updatedPartsList)
      }


    })

    updatedPartsList.shift()
    console.log(updatedPartsList)
    setPartsList(updatedPartsList);


}
  
  return (
  <div className='pl-[40px] container  max-w-full  '>
    <div className='flex flex-row  gap-[100px] pb-[50px] justify-center max-w-full'>
      <input className='' placeholder='Item Name' value={name} onChange={(e) => setName(e.target.value)}></input>
      <input placeholder='Quantity' type='number' value={quan} onChange={(e) => setQuan(e.target.value)}></input>

      <button onClick={nameSubmit}>Submit</button>
      <button onClick={refresh}>Refresh</button>
    </div>
      
      <div className='flex flex-col gap-[100px]'>
        {partsList.map(part => 
        <div className="flex flex-col gap-[15px]" key={part.id}>
        
          <div>
            Name: {part.name}
          </div>

          <div>
            Quantity: {part.quan}
          </div>
          
          <input placeholder='Update Quantity'  onChange={(e) => setNewQuan(e.target.value)}></input>
          <button onClick={() => changeQuan(part.id)}>Change Quan</button>
          <button onClick={() => removeItem(part.name)}>Remove</button>
        </div>)}
      </div>

      
    </div>
  )
}

export default Page1
