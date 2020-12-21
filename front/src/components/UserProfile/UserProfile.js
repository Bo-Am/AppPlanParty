import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { upload } from "./api";
import { useHistory, useParams } from "react-router-dom";
import AddFriend from "../AddFriend/AddFriend";



const UserProfile = () => {

    const history = useHistory()
    const user = useSelector(state => state.auth.user)
    const photo = useSelector(state => state)


    const [imgPreview, setImgPreview] = React.useState(null)
    const [error, setError] = React.useState(false)

    const dispatch = useDispatch()
    const handleImageChange = (e) => {
        const selected = e.target.files[0]
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"]
        if(selected && ALLOWED_TYPES.includes(selected.type)){
            console.log('selected')
            let reader = new FileReader()
            reader.onloadend = () => {
                setImgPreview(reader.result)
                dispatch({type: 'ADD_PHOTO', payload:reader.result})
                localStorage.setItem('photo', JSON.stringify(reader.result) )   //чтобы записать данные в локалстор
            }
            reader.readAsDataURL(selected)
        } else {
            setError(true)
            console.log('files not supported')
        }

    }

    return (
        <div>
            <AddFriend/>
           Name: {user && user.name}<br/>
           Mail: {user && user.email}<br/>
          <button onClick={() => user._id &&  history.push(`editprofile/${user._id}`)} className="btn btn-primary">Edit profile</button>
           {localStorage.getItem('photo') ? <img className="imgPreview" src={ JSON.parse( localStorage.getItem('photo') )} /> : null}
            <div className="container">
                {error && <p className="errorMsg">File not supported</p>}
                <div
               >
                    {!localStorage.getItem('photo') && (
                        <>
                        <p>Add an image</p>
                        <label htmlFor="fileUpload" className="customFileUpload">
                        Choose file
                        </label>
                            <input type="file" id="fileUpload" onChange={handleImageChange}/>
                            <span>(jpg, jpeg or png)</span>
                        </>
                        )}
                </div>
                    <button onClick={() => localStorage.removeItem('photo')}>Remove image</button>


        {imgPreview && (
          <button
            className="btn btn-primary"
            onClick={() => setImgPreview(null)}
          >
            Remove image
          </button>
        )}
      </div>
    </div>
   
  );
};

export default UserProfile;
