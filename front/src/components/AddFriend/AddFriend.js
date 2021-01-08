import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function AddFriend() {

  console.log(localStorage);

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
     .then(name => localStorage.setItem('friends', name))
  }


  return (
    <div>
      <form className="form" onSubmit={addFriend}>
        <div className="form-group">
          <input name={'email'}/>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" >Add Friend</button>
        </div>
      </form>
      <div>
        {localStorage.friends}
      </div>
    </div>
  )
}


