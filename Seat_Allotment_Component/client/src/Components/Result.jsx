import React, { useState } from 'react'
import './Result.css'
import Axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright'

export const Studentlogin = () => {
    const [application_number, setApplno] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    Axios.defaults.withCredentials = true
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:3000/result/StudentResultlogin', { application_number, email, password }, { withCredentials: true }).then(response => {
            if (response.data.status) {
                navigate('/Resultpg', { state: { name: response.data.name, surname: response.data.surname, email: response.data.email, marks: response.data.marks, gender: response.data.gender, rank: response.data.rank, application_number: response.data.application_number,allocation: response.data.allocation,preference1:response.data.preference1,preference2:response.data.preference2,preference3:response.data.preference3 } });
                console.log( "name"+response.data.allocation)
            } else {
                // Display error message from the backend as alert
                alert('Invalid username or password');
            }
        }).catch(err => {
            console.log(err.data)
            setErrorMessage('An error occurred. Please try again later.');
        })
    };
    return (
        <div className='result-container'>
            <form className='result-form' onSubmit={handleSubmit}>
                <h2 style={{ textAlign: 'center' }}>Seat Allotment Result</h2>
                <label htmlFor="application_number">Application Number:</label>
                <input type="text" placeholder='Application Number'
                    onChange={(e) => setApplno(e.target.value)} />

                <label htmlFor="email">Email:</label>
                <input type="email" autoComplete='off' placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password:</label>
                <input type="password" placeholder='*******'
                    onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Login</button>
            </form>
            <Copyright />
        </div>
    )
}
export default Studentlogin