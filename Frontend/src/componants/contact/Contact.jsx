import React from 'react'
import './contact.css'
import { toast } from 'react-toastify';
const Contact = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
        toast.success("Your messege has sended successfully");
    }
    return (
        <div className='contactForm'>
            <div className="contactContainer">
                <form onSubmit={(e)=>handleSubmit(e)} className='form'>
                    <h1>Contact Form</h1>
                    <div className="formInputTags">
                    <input type="text" placeholder='Enter your Name' className='contactInput' required/>
                    <input type="email" placeholder='Enter your email' className='contactInput' required/>
                    <textarea type="text" placeholder='Enter your Massege' className='contactInput' rows={5} required></textarea>
                    <button className='formButton'>submit</button>
                    </div>
                  
                </form>
            </div>
        </div>
    )
}

export default Contact