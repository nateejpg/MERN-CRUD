import React, { useState } from 'react'
import axios from 'axios';

const Add = ({ onTempAdd }) => { // Accept onTempAdd as a prop

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('');
    const [Status, setStatus] = useState(null)
    const arrayReview = [0, 1, 2, 3, 4, 5]
    const statusReview = ["To Watch", "Watching", "Watched"]

 
    const handleAdd = () => {

      const userId = localStorage.getItem('userId');
      const newItem = {title, description, rating, status: Status};

      if(userId){

        axios.post('http://localhost:3001/add',{...newItem, userId})
          .then(result => console.log(result))
          .catch(err => console.log(err))

          location.reload()

      }else{

        if(onTempAdd) onTempAdd(newItem)
        
      }
      
    }

  return (
    <div>
        <input type='text' placeholder='Add the title' onChange={(e) => setTitle(e.target.value)}/>
        <input type='text' placeholder='Add the description' onChange={(e) => setDescription(e.target.value)}/>
        <select onChange={(e) => setRating(e.target.value)}>
          <option>Ratings</option>
          {
            arrayReview.map(r => (
              <option value={r} key={r}>{r}</option>
            ))
          }
        </select>
        <select onChange={(e) => setStatus(e.target.value)}>
          <option>Status</option>
          {statusReview.map(s => (
            <option value={s} key={s}>{s}</option>
          ))}
        </select>
        <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Add
