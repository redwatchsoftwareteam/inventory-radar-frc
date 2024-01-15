import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection, deleteDoc, doc, documentId, getDocs, onSnapshot, query, setDoc, updateDoc, where} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';



const Old_closet = () => {

const [name, setName] = useState("")
const [quan, setQuan] = useState(0)
const [newQuan, setNewQuan] = useState(0)
const [newId, setNewId] = useState("")

const [location, setLocation] = useState("")
const [newLoc, setNewLoc] = useState("")


const storedData = window.localStorage.getItem('oldClosetData');
const parsedDataBeta = storedData ? JSON.parse(storedData) : {};
const initPartsList = parsedDataBeta.partsList || [];
const [partsList, setPartsList] = useState(initPartsList)

// Load data from local storage when the component mounts
useEffect(() => {
    
  const storedData = window.localStorage.getItem('oldClosetData');
  
  if (storedData) {
    const parsedDataBeta = JSON.parse(storedData);
    // console.log(parsedDataBeta)
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


  window.localStorage.setItem('oldClosetData', JSON.stringify(dataToStore));
}, [partsList, newQuan, newLoc /* ... other state variables ... */]);


// useEffect(() => {
//   // console.log("test")
// })

async function removeItem(partName) {
  // console.log(partName)
  const q = query(collection(db, "old-closet"), where("name", "==", partName));
  const querySnapshot = await getDocs(q);
  var docId;
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    docId = doc.id; // Get the document ID
    
  });

  await deleteDoc(doc(db, "old-closet", docId));

  // for (var i = 0; i < partsList.length; i++) {
  //   console.log("updatedPartsList")

  //   if (partsList[i].partName == partName){
  //     let updatedPartsList = partsList;
  //     updatedPartsList.splice(i,1);
  //     setPartsList(updatedPartsList);
  //   }
  // }

 }

 async function changeQuan(id) {
  let txtBox = document.getElementById(id);
  console.log(txtBox.value)
  txtBox.value = "";

  console.log("Id:", id);
  await updateDoc(doc(db, 'old-closet', id), {
    quan: newQuan.toString(),
  })

  for (var i = 0; i < partsList.length; i++) {
    console.log("Checking part:", partsList[i]);

    if (partsList[i].id == id){
      partsList[i].quan = newQuan
    }
  }

  console.log("Updated partsList:", partsList);

  setNewQuan(0)
 }

 async function changeLoc(id) {
  let txtBox = document.getElementById(id);
  console.log(txtBox.value)
  txtBox.value = "";

  console.log("Id:", id);
  await updateDoc(doc(db, 'old-closet', id), {
    location: newLoc.toString(),
  })

  for (var i = 0; i < partsList.length; i++) {
    console.log("Checking part:", partsList[i]);

    if (partsList[i].id == id){
      partsList[i].location = newLoc
    }
  }

  console.log("Updated partsList:", partsList);

  setNewLoc("")
 }


function nameSubmit() {
  let id;
  addDoc(collection(db, "old-closet"), {
    name: name,
    quan: quan,
    location: location
  }).then(docRef => {

    console.log("Document written with ID: ", docRef.id);
    id = docRef.id;
    setNewId(id)

})
console.log(newId)
var updatedPartsList = partsList 
    updatedPartsList.push({
      name: name,
      quan: quan,
      location: location,
      id: newId
    })

    setPartsList(updatedPartsList)
    console.log(partsList)
  
  setName("")
  setQuan(0)
}

  async function refresh() {

    const qDcaf = query(collection(db, "old-closet"))

    onSnapshot(qDcaf, {includeMetadataChanges:true}, (snapshot) =>
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // console.log("New match: ", change.doc.data())
        }
        const source = snapshot.metadata.fromCache ? "local cache" : "server";
        // console.log("Data came from " + source)
      }))

       

    const querySnapshot = await getDocs(qDcaf)
    let updatedPartsList = []


    querySnapshot.forEach(doc => {
      const docData = doc.data();
    
      var newPartList = {
        name: docData.name,
        quan: docData.quan,
        location: docData.location,
        id: doc.id,
      }
      
      updatedPartsList.push(newPartList);


    })

    // console.log(updatedPartsList)
    setPartsList(updatedPartsList);


}
  
  return (
  <div className='container absolute max-w-full font-Poppins '>

    <div className='flex flex-col  gap-[20px] sm:gap-[25px] pb-[50px] justify-center items-center '>
      
      <div className='flex sm:flex-row gap-[20px]'>
        <input className='w-[300px]  h-[50px] rounded-lg pl-[2px]' placeholder='Item Name' value={name} onChange={(e) => setName(e.target.value)}></input>
        <input className='w-[50px]  h-[50px] rounded-lg pl-[2px]' placeholder='Quantity' type='number' value={quan} onChange={(e) => setQuan(e.target.value)}></input>
        <input className='w-[300px]  h-[50px] rounded-lg pl-[2px]' placeholder='Location'  value={location} onChange={(e) => setLocation(e.target.value)}></input>

      </div>

      <div className='flex sm:flex-row gap-[20px]'>
        <button className="hover:text-black hover:bg-white  hover:border-black " onClick={nameSubmit}>Submit</button>
        <button className='hover:text-black hover:bg-white  hover:border-black 'onClick={refresh}>Refresh</button>
      </div>
      
    </div>
      
      <div className='flex flex-col gap-[100px] pl-[10px] pb-[200px]'>
        {partsList.map(part => 
        <div className="flex flex-col gap-[15px]" key={part.id}>
        
          <div className='flex flex-row gap-[2px] font-semibold'>
            Name: {part.name}
            <button className='w-[75px] h-[30px] flex items-center justify-center text-red-700 hover:text-black hover:bg-red-700  hover:border-black ' onClick={() => removeItem(part.name)}>Remove</button>
          </div>

          <div className='flex flex-row gap-[10px]'>
            # of {part.name}: {part.quan}
            <input id={part.id} className='w-[100px] h-[30px] rounded-lg pl-[5px]' placeholder='Enter new #'  onChange={(e) => setNewQuan(e.target.value)}></input>
            <button className='w-[100px] h-[30px] flex items-center justify-center text-green-500  hover:text-black hover:bg-green-500  hover:border-black ' onClick={() => changeQuan(part.id)}>Enter</button>
          </div>

          <div className='flex flex-row gap-[10px]'>
            Location : {part.location}
            <input id="newLoc" className='w-[300px] h-[30px] rounded-lg pl-[5px]' placeholder='Enter new location'  onChange={(e) => setNewLoc(e.target.value)}></input>
            <button className='w-[100px] h-[30px] flex items-center justify-center text-green-500 hover:text-black hover:bg-green-500  hover:border-black ' onClick={() => changeLoc(part.id)}>Enter</button>
          </div>
          
        </div>)}
      </div>

      
    </div>
  )
}

export default Old_closet
