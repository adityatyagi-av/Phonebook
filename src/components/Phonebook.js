import axios from 'axios'
import React,{useState,useEffect} from 'react'
import phoneServices from './phone'



export default function Phonebook() {
    const [persons, setPersons] = useState([
        ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
      phoneServices
      .getAll() 
      .then(requestedData=>{
                console.log(requestedData)
                setPersons(requestedData)
        }   
        )
      
    }, [])
    

    const updateName=(event)=>{
      setNewName(event.target.value)
    }

    const updateNumber=(event)=>{
      setNewNumber(event.target.value)
    }
   
  //adding the number
    const numberAdd=(event)=>{
    event.preventDefault()
    
   
    console.log(typeof(event.target.value))
 
    //function to check name
    const found=persons.some(person=>person.name === newName)
    console.log(found)
    if(!found){
      console.log('Not found in the list')
      const obj={
        name: newName,
        id: persons.length +1,
        number: newNumber
      }
      phoneServices
      .create(obj)
      .then(requestedData=>{
        console.log(requestedData)
        setPersons(persons.concat(requestedData))
  
      })
      }
   
      else{
      alert(`${newName} is already in the phonebook, Save with new name`)
   
      } 
    }
   //function ends here


   const filterArray=(event)=>{
    setFiltered(event.target.value)
    console.log(event.target.value)
   }

  return (
    <div>
        <h1>PhoneBook</h1>
        <p>filter shown with: <input type="text" value={filtered} onChange={filterArray} /></p>
        <form onSubmit={numberAdd}>
        <p>name: <input type="text" onChange={updateName} value={newName}/></p>
        <p>number: <input type="tel" onChange={updateNumber} value={newNumber}/></p>
        <button>add</button>
        </form>
    <h1>Numbers</h1> 
   
    <ul>
     
        {persons.filter((person)=>
         person.name.toLowerCase().includes(filtered.toLowerCase())
         ).map(person=>{
        
            return(
              <li key={person.id}>{person.name} : {person.number}</li>
            )
          })
        
    } 
        
     
      
    
    </ul> 
    </div>
  )
}
