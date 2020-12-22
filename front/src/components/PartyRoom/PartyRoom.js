import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'

export default function PartyRoom() {
  // const userId = useSelector(user => user.auth.user._id)

  const user = useSelector(user => user.auth.user)

  const [party, setParty] = useState([])

  const history = useHistory()

  const { id } = useParams()

    useEffect(() => {
    fetch(`/api/partyroom/${id}`)
    .then(res => res.json())
    .then(data => setParty(data) )
    }, [])

  const deleteParty = () => {
   return fetch(`/api/partyroom/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => history.push('/myparties'))
  }
  const addMember = (e) => {
    e.preventDefault()
    const { email : {value : email}} = e.target
     fetch('/api/addmember', {
       method: 'PUT',
       headers: {'Content-Type' : 'application/json'},
       body: JSON.stringify({
         email,
         id
       })
     })
     .then(res => res.json())
     .then(name => console.log(name))
  }

  const [partyMembers, setPartyMembers] = useState()

  useEffect(() => {
    fetch(`/api/addmember/${id}`)
    .then(res => res.json())
    .then(data => setPartyMembers(data))
  }, [])

  console.log(partyMembers);

  const author = party.author

  const buttons = 
  <>
    <button className="btn btn-primary" onClick={deleteParty}>Delete Party</button>
    <button className="btn btn-primary" onClick={() => history.push(`/editform/${id}`)}>Edit Party</button><br/>
    <div>
      <form className="form" onSubmit={addMember}>
        <div className="form-group">
          <input placeholder=" enter user email" name="email"/>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" >Add Member</button>
        </div>
      </form>
     
      
    </div>
  </>

  const partyData = 
  <>
      <div>{ party.partyName }</div>
      <div>{ party.partyPlace }</div>
      <div>{ party.partyDate }</div>
      <div>{ party.partyTime }</div>
  </>
  return (
    <>
    {user && partyData}
    {user && (author === user._id)? buttons : null}
    <div>
      <p className="lead">
        Members
      </p>
      <ul>
        {partyMembers?.map((el) =><li>{el.name}</li>  )}
      </ul>
      </div>
    </>
)
}
