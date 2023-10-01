import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
import blank from '../../images/blank.png'
import { toast } from 'react-toastify';
import axios from "axios";

export default function TopBar() {
  const divRef = useRef(null);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [cats, setCats] = useState([]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Logedout succesfully")
  };
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });


  return (
    <div className="top">
      <div className="topLeft">
        <div className="logo">
          <Link className="link" to="/">
            BlogWorld
          </Link>
        </div>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              <div className="dropdown">
                <div className="dropbtn">CATEGORIES</div>
                <div className="dropdown-content">
                  {cats.map((ele, index) => (
                    <Link to={`/category/${ele.name}`} className="link" key={index}>
                      <span key={index} >{ele.name}</span>
                      <div></div>
                    </Link>
                  ))}
                </div>
              </div>

            </Link>
          </li>

          <li className="topListItem"  ref={divRef}>
           <Link to={`/contact`} className="link"> CONTACT</Link>
             
       
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings" className="link" style={{display : "flex", alignItems : "center", gap : "10px"}}>
            <img className="topImg" src={user.profilePic === "" ? blank : PF + user.profilePic} alt="" />
            <b>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</b>
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
       
      </div>
    </div>
  );
}
