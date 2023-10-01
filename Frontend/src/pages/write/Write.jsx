import { useContext, useState } from "react";
import "./write.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Footer from "../../componants/footer/Footer";

export default function Write() {
  const [cat, setCat] = useState("")
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const naigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      category: cat
    };
    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      toast.success("Your post has been posted successfully")
      naigate("/post/" + res.data._id);
    } catch (err) {
      toast.warning("Something went wrong")
    }
  };
  return (
    <>
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit} action="/upload" enctype="multipart/form-data" method="post">
        <div className="writeFormGroup">
          <span style={{ fontSize: "10px" }}>Upload Image</span>
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="categoriesItemsLists">
          <h3>Category -</h3>
          <div className="cat">
            <input type="radio" name='cat' value="art" id='art' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' value="science" id='science' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>  </div>
          <div className="cat">
            <input type="radio" name='cat' value="cinema" id='cinema' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>  </div>
          <div className="cat">
            <input type="radio" name='cat' value="design" id='design' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>  </div>
          <div className="cat">
            <input type="radio" name='cat' value="food" id='food' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="food">Food</label></div>
          <div className="cat">
            <input type="radio" name='cat' value="travel" id='travel' onChange={(e) => setCat(e.target.value)} />
            <label htmlFor="travel">Travel</label></div>
        </div>
        <div className="writeFormGroup">
          <ReactQuill theme="snow" value={desc} onChange={setDesc} className='writeInput writeText' />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
