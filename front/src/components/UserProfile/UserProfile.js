import React from "react";
import { useSelector } from "react-redux";
import ImageUploader from "react-image-uploader";
import { upload } from "./api";
import { useHistory, useParams } from "react-router-dom";
import AddFriend from "../AddFriend/AddFriend";


const UserProfile = () => {
  const history = useHistory()
  
  const user = useSelector((state) => state.auth.user);
  
  const [imgPreview, setImgPreview] = React.useState(null);
  const [error, setError] = React.useState(false);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    console.log(selected);
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      console.log("selected");
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
      console.log("files not supported");
    }
  };
  return (
    <div>

      Name: {user && user.name}
      <br />
      Mail: {user && user.email}
      <br />
      <button id="editProf" onClick={() => user._id &&  history.push(`editprofile/${user._id}`)} className="btn btn-primary">Edit profile</button>

      <div className="container">
        {error && <p className="errorMsg">File not supported</p>}
        <div 
          className="imgPreview"
          style={{
            background: imgPreview
              ? `url("${imgPreview}") no-repeat center/cover`
              : "#131313",
          }}
        >
          {!imgPreview && (
            <>
              <p>Add an image</p>
              <label htmlFor="fileUpload" className="customFileUpload">
                Choose file
              </label>
              <input type="file" id="fileUpload" onChange={handleImageChange} />
              <span>(jpg, jpeg or png)</span>
            </>
          )}
        </div>
        {imgPreview && (
          <button
            className="btn btn-primary"
            onClick={() => setImgPreview(null)}
          >
            Remove image
          </button>
        )}
      </div>
      {/*<input type={"file"}  onChange={handleImageChange}/>*/}
    </div>
   
  );
};

export default UserProfile;
