import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function MyParties() {

  const [parties, setparties] = useState(null)

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
  

  return (
    <div>
      {parties?.map((el) => <div key={el._id}><Link to={`/myparties/${el._id}`}>{el.partyName}</Link><br/>Дата: {el.partyDate}</div>  )}
      
    </div>
  )
}
