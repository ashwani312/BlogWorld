import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../componants/post/Post';
import './Categories.css'
import Sidebar from '../../componants/sidebar/sidebar';
import Loading from '../../componants/loading/Loading';
import Footer from '../../componants/footer/Footer';

const Categories = () => {
    const { cat } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/posts");
            const filterData = res?.data.filter((item) => item.category === cat);
            setPosts(filterData);
            setLoading(false);
        }
        fetchPost()
    }, [cat]);
    if(loading){
        return <Loading/>
    }
    return (
        <>
        <div className="cats">
            <div className='categories'>
                {posts?.map((item, index) => (
                    <Post post={item} key={index} />
                ))}
            </div>
            <Sidebar/>
        </div>
        <Footer/>
        </>
    )
}

export default Categories