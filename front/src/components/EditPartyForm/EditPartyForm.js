import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

export default function EditPartyForm() {
  const history = useHistory()

  const { id } = useParams()

  const [party, setParty] = useState([])


  useEffect(() => {
    fetch(`/api/editparty/${id}`)
    .then(res => res.json())
    .then(data => setParty(data))
  },[])

  function submitHandler(e) {
    e.preventDefault();
    const {
      partyName: { value: partyName },
      partyPlace: { value: partyPlace },
      partyDate: { value: partyDate },
      partyTime: { value: partyTime },
      partyPrice: { value: partyPrice },
    } = e.target;

    fetch(`/api/editparty/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
        partyName,
        partyPlace,
        partyDate,
        partyTime,
        partyPrice
      }),
    })
    .then(res => {
      if(res.status === 200){
        history.push(`/myparties/${id}`)
      }
    })
  }
  return (
    <div>
        <Fragment>
        <h1 className="large text-primary">Edit Party</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Edit Your Party
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input type="text" defaultValue={party.partyName} name="partyName" />
          </div>
          <div className="form-group">
            <input type="text" defaultValue={party.partyPlace} name="partyPlace" />
          </div>
          <div className="form-group">
            <input type="date" defaultValue={party.partyDate} name="partyDate" />
          </div>
          <div className="form-group">
            <input type="time" defaultValue={party.partyTime} name="partyTime" />
          </div>
          <div className="form-group">
            <input type="number" min="0" step="500" defaultValue={party.partyPrice} name="partyPrice"/>
          </div>
          <input type="submit" className="btn btn-primary" value="Edit party"/>
        </form>
      </Fragment>
    </div>
  )
}

