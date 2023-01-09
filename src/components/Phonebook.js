import axios from 'axios'
import React,{useState,useEffect} from 'react'
import phoneServices from './phone'

const Person=({person,deleteElement})=>{
  return(
    <li>{person.name} :{person.number} <button onClick={deleteElement}>Delete</button>
    </li>
    
  )
}


export default function Phonebook() {
    const [persons, setPersons] = useState([
        ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState('')
    const [showAll, setShowAll] = useState(true)
    
    const deleteAll=(id)=>{
      if(window.confirm("Do you really want to delete")){
        phoneServices
      .deleteIt(id)
      .then(requestedData=>{
        console.log("element deleted")
      })
      }
      
    }



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
    
  //  console.log(newName)
    // console.log(typeof(event.target.value))
    // console.log(event.target.value)
   
    const findName=persons.find(per=> per.name.toLowerCase() === `${newName.toLowerCase()}`)
    // console.log(findName.name)
    if(findName === undefined){
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
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const obj={
          name: newName,
          id: findName.id,
          number: newNumber
        }   
        phoneServices
        .update(findName.id,obj)
        .then(requestedData=>{
          console.log('data has been updated')
        })
        }
   
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
              <Person key={person.id} person={person} deleteElement={()=>deleteAll(person.id)}/>
              )
          })
        
    } 
        
     
      
    
    </ul> 
    </div>
  )
}
