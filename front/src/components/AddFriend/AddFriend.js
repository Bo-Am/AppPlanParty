import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AddFriend() {

  const [friends, setFriends] = useState()
  
  const id = useSelector(state => state.auth.user._id)

  const addFriend = (e) => {
    e.preventDefault()
    const { email : {value : email}} = e.target
     fetch('/api/addfriend', {
       method: 'PUT',
       headers: {'Content-Type' : 'application/json'},
       body: JSON.stringify({
         email,
         id
       })
     })
     .then(res => res.json())
     .then(name => setFriends(name))
  }
  


  return (
    <div>
      <form className="form" onSubmit={addFriend}>
        <input name={'email'}/>
        <button >Add Friend</button>
      </form>
      <div>
        {friends && friends}
      </div>
    </div>
  )
}
