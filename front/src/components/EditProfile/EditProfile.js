import React, {Fragment, useEffect, useState} from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';


export default function EditProfile() {

  const history = useHistory()
  const { id } = useParams()

  const [profile, setProfile] = useState([])

  useEffect(() => {
    fetch(`/api/editprofile/${id}`)
    .then(res => res.json())
    .then(data => setProfile(data))
  }, [])
  
  console.log(profile.name);

  function submitHandler(e) {
    e.preventDefault();
    const {
      name: { value: name },
      email: { value: email },
    } = e.target;

    fetch(`/api/editprofile/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email
      })
    })
    .then(res => {
      if(res.status === 200){
        window.location='/profile'     
      }
    })
  }

  return (
    <div>
      <Fragment>
      <h1 className="large text-primary">Edit profile</h1>
      <p className="lead"><i className="fas fa-user"></i> Edit your profile</p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input required type="text" placeholder="Name" name="name" defaultValue={profile.name}/>
        </div>
        <div className="form-group">
          <input required type="email" placeholder="Email Address" name="email" defaultValue={profile.email}/>
        </div>
        <input required type="submit" className="btn btn-primary" value="Edit profile"/>
      </form>
    </Fragment>
    </div>
  )
}

