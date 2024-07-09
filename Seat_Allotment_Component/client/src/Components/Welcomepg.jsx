import React, { useState } from 'react'
import './Welcomepg.css'
import { Link } from 'react-router-dom';
// import Axios, { AxiosError } from 'axios'
import Copyright from './Copyright'
import videobg from "../assets/rec.mp4";

export const Welcomepg = () => {
    // Axios.defaults.withCredentials = true
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     Axios.post('http://localhost:3000/auth/Adminlogin', { username, email, password, }).then(response=>{
    //         if(response.data.status){
    //             navigate('/Adminhome')
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // };
    return (
        <div className="main">
            <div className='welcome-container'>
                <video src={videobg} autoPlay loop muted />
                <form className=' welcome-form'>
                    <h2 style={{ textAlign: 'center' }}>Welcome to the Seat Allotment Portal!</h2>
                    <div className='welcome-buttons'>
                        <Link to="/Studentlogin"><button>Student Login</button></Link>
                        <Link to="/Adminlogin"><button>Admin Login</button></Link>
                        <Link to="/Result"><button>Result Login</button></Link>
                    </div>
                </form>
                <Copyright />
            </div>
        </div>
    )
}
export default Welcomepg