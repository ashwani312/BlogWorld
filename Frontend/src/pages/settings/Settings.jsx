import "./settings.css";
import Sidebar from "../../componants/sidebar/sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import blank from '../../images/blank.png'
import { toast } from 'react-toastify';

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const PF = "http://localhost:5000/images/"


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      const data = await res.data;
      toast.success("Profile has been updated successfully")
      dispatch({ type: "UPDATE_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async () => {
    const userDetails = {
      userId : user._id
    }
    try {
      
    const res =   await axios.delete("/users/" + user._id, userDetails);
    dispatch({type : "DELETE_ACCOUNT"})
     res.status===200 && toast.success("Deleted successfully");
    } catch (error) {
      console.log(error)
    }
  }
  const submitTheForm = (e) =>{
    handleSubmit(e);
    setTimeout(()=>{
      handleSubmit(e)
    },2000)
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={(e)=>submitTheForm(e)}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {/* <img
              src={`${user.profilePic === "" ? URL.createObjectURL(file) || blank : PF + user?.profilePic}`}
              alt=""
            /> */}
            <img
              src={blank}
              alt=""
              style={{display : file? "none" : "block"}}
            />
         {file && <img
              src={URL.createObjectURL(file)===null?`${PF + user?.profilePic}` : URL.createObjectURL(file)}
              alt=""
            />}
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
