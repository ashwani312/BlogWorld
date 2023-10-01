import React from 'react'
import loadingImage from '../../images/loading.gif'
const Loading = () => {
  return (
    <div style={{
        height : "100vh",
        width : "100vw",
        display : 'flex',
        alignItems : "center",
        justifyContent : "center"
    }}> <img src={loadingImage} alt="" height="50px"/> </div>
  )
}

export default Loading