import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from '../../images/bloglogo.jpg'
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT WEBSITE</span>
        <img
          src={image}
          alt=""
        />
        <p>
          Blog World is a blogging website that help peoples to write there interest, journey and real life Experiences so that anyone can read there stories.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats?.map((c, index) => (
            <Link to={`/category/${c.name}`} className="link" key={index}>
              <li className="sidebarListItem" key={index}>{c?.name?.charAt(0).toUpperCase() + c.name.slice(1)}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
