import React,{useState} from 'react'

export default function Phonebook() {
    const [persons, setPersons] = useState([
        
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState('')
    const [showAll, setShowAll] = useState(true)

    
    const updateName=(event)=>{
      setNewName(event.target.value)
    }

    const updateNumber=(event)=>{
      setNewNumber(event.target.value)
    }
   
  //adding the number
    const numberAdd=(event)=>{
    event.preventDefault()
    
    console.log(event.target)
    console.log(typeof(event.target.value))
    //function to check name
    const found=persons.some(person=>person.name === newName)
    console.log(found)
   
   
    if(!found){
      console.log('already in the list')
      const obj={
        name: newName,
        id: persons.length +1,
        number: newNumber
      }
      console.log(obj)
      setPersons(persons.concat(obj))
      }
   
      else{
      alert(`${newName} is already in the phonebook, Save with new name`)
   
      } 
    }
   //function ends here


   const filterArray=(event)=>{
    setFiltered(event.target.value)
    const found=persons.some(person=>person.name === filtered)
    console.log(found)
    if(found){
      setShowAll(false)
      setFiltered(event.target.value)
    }
    else{
      setShowAll(true)
    }
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
    {filtered} 
    <ul>
      {showAll
      ?persons.map(person=>{
        console.log(person.id)
        return(
          <li key={person.id}>{person.name} : {person.number}</li>
        )
      })
      
      :persons.map(person=> {
        if(person.name==={filtered}){
          return(
            <li>{person.name} : {person.number}</li>
            )
        }
        
      })
      }
    
    </ul> 
    </div>
  )
}
