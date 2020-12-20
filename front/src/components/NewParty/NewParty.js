import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'


export default function NewParty() {
  const history = useHistory();
  const user = useSelector((store) => {
    return store.auth.user
 })

  function submitHandler(e) {
    e.preventDefault();
    const {
      partyName: { value: partyName },
      partyPlace: { value: partyPlace },
      partyDate: { value: partyDate },
      partyTime: { value: partyTime },
      partyPrice: { value: partyPrice },
    } = e.target;
    fetch("http://localhost:5000/api/newparty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partyName,
        partyPlace,
        partyDate,
        partyTime,
        partyPrice,
        id: user._id
      }),
    })
    .then(res => {
      if(res.status === 200){
        history.push('/myparties')
      }
    })
  }

  return (
    <div>
      <Fragment>
        <h1 className="large text-primary">Add Party</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Party
        </p>
        <form className="form" onSubmit={submitHandler}>
          <div className="form-group">
            <input type="text" placeholder="Party name" name="partyName" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Place" name="partyPlace" />
          </div>
          <div className="form-group">
            <input type="date" placeholder="Date" name="partyDate" />
          </div>
          <div className="form-group">
            <input type="time" placeholder="Time" name="partyTime" />
          </div>
          <div className="form-group">
            <input type="number" min="0" step="500" placeholder="Price" name="partyPrice"/>
          </div>
          <input type="submit" className="btn btn-primary" value="Add party" />
        </form>
      </Fragment>
    </div>
  );
}
