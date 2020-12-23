import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { INIT_ROOM } from '../../actions/types'

export default function MyParties() {

  const [parties, setparties] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory();

  const user = useSelector((store) => {
     return store.auth.user
  })

  useEffect(() => {
    if(user){
      fetch(`/api/myparties/${user._id}`)
      .then(res => res.json())
      .then(data => setparties(data))
    }
  }, [user])
  const myParties = parties?.parties
  
  const memParties = parties?.members

const onClickHandler = (e, partyId) => {
  console.log(partyId);
  dispatch({
    type: INIT_ROOM,
    payload: {room: partyId}
  })
  history.push(`/myparties/${partyId}/chat`)
}

  return (
    <div>
      {myParties?.map((el) =>
      <div key={el._id}>
        <button onClick={e=>onClickHandler(e, el._id)}>{el.partyName}</button>
        <br/>Дата: {el.partyDate}
        </div>)}
      {myParties?.map((el) => <div key={el._id}><Link to={`/myparties/${el._id}`}>{el.partyName}</Link><br/>Дата: {el.partyDate}</div>  )}
      {/* {memParties?.map((el) => <div key={el._id}><Link to={`/myparties/${el._id}/chat`}>{el.partyName}</Link><br/>Дата: {el.partyDate}</div>  )} */}
    </div>
  )
}
