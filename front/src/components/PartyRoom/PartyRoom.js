import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default function PartyRoom() {

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

  


  return (
    <>
      <div>{ party.partyName }</div>
      <div>{ party.partyPlace }</div>
      <div>{ party.partyDate }</div>
      <div>{ party.partyTime }</div>
      <button className="btn btn-primary" onClick={deleteParty}>Delete Party</button>
      <button className="btn btn-primary" onClick={() => history.push(`/editform/${id}`)}>Edit Party</button>

    </>
  )
}
