import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Add from './Add'
import axios from 'axios'

const Home = () => {

  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editRating, setEditRating] = useState('');
  const [editTempIdx, setEditTempIdx] = useState(null);

  const rating = [0, 1, 2, 3, 4, 5];
  const status = ['ToWatch', 'Watching', 'Watched']
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId')

  useEffect(() => {

      if(userId){
        axios.get('http://localhost:3001/get/' + userId)
        .then(result => setItems(result.data))
        .catch(err => console.log(err))

      }else{
        
        axios.get('http://localhost:3001/get')
        .then(result => setItems(result.data))
        .catch(err => console.log(err))
      }
    
  },[userId])


  const handleDelete = (id) => {

   axios.delete("http://localhost:3001/delete/"+id)
    .then(result => console.log(result))
    .catch(err => console.log(err))

    location.reload();

  }

  const handleEdit = (id) => {

    axios.put("http://localhost:3001/update/" + id, {title: editTitle, description: editDescription, rating: editRating, status: editStatus})
    .then(result => {
      setEditTitle('')
      setEditDescription('')
      setEditRating('')
      setEditStatus('')
      setEditId(null)
    })
    .catch(err => console.log(err))

    location.reload();
  }

  const handleLogOut = () => {

    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setItems([])
    setTempItems([])
  }

  const handleTempDelete = idx => {
    setTempItems(tempItems => tempItems.filter((_, i) => i !== idx));
  };

  const handleTempEdit = idx => {

    const item = tempItems[idx];
    setEditTempIdx(idx);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditRating(item.rating);
    setEditStatus(item.status);

  };

  const handleTempSave = idx => {

    setTempItems(tempItems =>
      tempItems.map((item, i) =>
        i === idx
          ? {
              ...item,
              title: editTitle,
              description: editDescription,
              rating: editRating,
              status: editStatus,
            }
          : item
      )
    );
    setEditTempIdx(null);
    setEditTitle('');
    setEditDescription('');
    setEditRating('');
    setEditStatus('');

  };

  return (
    <div>
        <h1>Shows' Reviews</h1>
        {
          userId ?      
       <div>
        <p>Welcome back {username}!</p>
       </div>
       :
        <Link to={'/Login'}><p>Login</p></Link>
        }{
          userId ?
          <div>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          :
          <p></p>
        }
        <Add onTempAdd={item => setTempItems([...tempItems, item])}/>
      {
        userId ?
          items.length === 0 ?
          <div>
            <p>Add some shows to your list!</p>
          </div>
          :
          items.map(i => (
            <div key={i._id}>
              {editId === i._id ? (
                <div>
                  <input placeholder="Edit Your Title" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                  <input placeholder='Edit Your Description' value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                  <select value={editRating} onChange={e => setEditRating(e.target.value)}>
                    {rating.map(i => (
                      <option value={i} key={i}>{i}</option>
                    ))}
                  </select>
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                    {status.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={() => handleEdit(i._id)}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{i.title}</p>
                  <p>{i.description}</p>
                  <p>{i.rating}</p>
                  <p>{i.status}</p>
                  <button onClick={() => handleDelete(i._id)}>Delete</button>
                  <button onClick={() => {
                    setEditId(i._id);
                    setEditTitle(i.title);
                    setEditDescription(i.description);
                    setEditRating(i.rating);
                    setEditStatus(i.status);
                  }}>Edit</button>
                </div>
              )}
            </div>
          ))
        :
        <>
          {tempItems.map((i, idx) => (
            <div key={`temp-${idx}`}>
              {editTempIdx === idx ? (
                <div>
                  <input placeholder="Edit Your Title" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                  <input placeholder='Edit Your Description' value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                  <select value={editRating} onChange={e => setEditRating(e.target.value)}>
                    {rating.map(r => (
                      <option value={r} key={r}>{r}</option>
                    ))}
                  </select>
                  <select value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                    {status.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={() => handleTempSave(idx)}>Salvar</button>
                </div>
              ) : (
                <div>
                  <p>{i.title}</p>
                  <p>{i.description}</p>
                  <p>{i.rating}</p>
                  <p>{i.status}</p>
                  <button onClick={() => handleTempDelete(idx)}>Deletar</button>
                  <button onClick={() => handleTempEdit(idx)}>Editar</button>
                </div>
              )}
            </div>
          ))}
        </>
      }
    </div>
  )
}

export default Home