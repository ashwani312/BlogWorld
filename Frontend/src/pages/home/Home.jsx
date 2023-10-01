import React, { useEffect, useState } from 'react'
import './home.css'

import Posts from '../../componants/posts/Posts'
import Sidebar from '../../componants/sidebar/sidebar'
import axios from "axios";
import { useLocation } from 'react-router-dom'
import Loading from '../../componants/loading/Loading';
import Footer from '../../componants/footer/Footer';



export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts()
  }, [search]);
  if(loading){
    return <Loading/>
  }
  return (
    <>
      <div className='home'>
        <Posts posts={posts}/>
        <Sidebar />
      </div>
      <Footer />
    </>
  )
}
