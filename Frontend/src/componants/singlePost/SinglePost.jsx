import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import DOMPurify from "dompurify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from "../footer/Footer";

export default function SinglePost() {
  const navigate = useNavigate()
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLoading(false);
    };
    getPost();
  }, [path]);
  if (loading) {
    return <Loading />
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      toast.success("Post has been deleted successfully")
      navigate("/");
    } catch (err) {
      toast.error("something went wrong")
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user?.username,
        title,
        desc,
      });
      toast.success("Post has been updated successfully")
      setUpdateMode(false)
    } catch (err) {
      toast.error("something went wrong")
    }
  };


  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
            <img src={PF + post.photo} alt="" className="singlePostImg" />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b> {post?.username?.charAt(0).toUpperCase() + post?.username?.slice(1)}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            // <textarea
            //   className="singlePostDescInput"
            //   value={desc}
            //   onChange={(e) => setDesc(e.target.value)}
            // />
            <ReactQuill theme="snow" value={desc} onChange={setDesc} className='writeInput writeText' />
          ) : (
            <p className="singlePostDesc"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(desc),
              }}
            ></p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
}
