import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
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
   return fetch(`/api/partyRoom/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => history.push('/myparties'))
  }



  const author = party.author

  const buttons = 
  <>
   <button className="btn btn-primary" onClick={deleteParty}>Delete Party</button>
   <button className="btn btn-primary" onClick={() => history.push(`/editform/${id}`)}>Edit Party</button><br/>
    <div>
   <input/>
   <button className="btn btn-primary">Add member</button>
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
    </>
)
}
