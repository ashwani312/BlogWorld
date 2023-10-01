import React from 'react'
import './single.css'
import SinglePost from '../../componants/singlePost/SinglePost'
import Sidebar from '../.././componants/sidebar/sidebar'
import Footer from '../../componants/footer/Footer'


export default function Single() {
  
  return (
    <>
    <div className='single'>
      <SinglePost />
      <Sidebar />
    </div>
<Footer/>
    </>
  )
}
