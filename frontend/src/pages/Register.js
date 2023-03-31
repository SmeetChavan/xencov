import { useState } from 'react';
import {Link} from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function Register() {

    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [country , setCountry] = useState('');
    const [mobileNumber , setMobileNumber] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [conPass , setConPass] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {

        event.preventDefault();

        const user = {firstName , lastName , password , email ,  country , mobileNumber};

        const response = await fetch('/api/register' , {
            method: "POST",
            headers:{
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(user)
        })

        if(!response.ok){
            alert("Failed!");
        }
        else{
            alert("Registered Successfully!");
            navigate("/login");
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setCountry('');
        setMobileNumber('');
        setPassword('');
        setConPass('');
    }

    return (
        <>
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4">
                        <label htmlFor="fname">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fname"
                            aria-describedby="emailHelp"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => {setFirstName(e.target.value)}}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lname">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lname"
                            aria-describedby="emailHelp"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => {setLastName(e.target.value)}}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="coun">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="coun"
                            aria-describedby="emailHelp"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => {setCountry(e.target.value)}}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ph">Phone</label>
                        <input
                            type="Number"
                            className="form-control"
                            id="ph"
                            aria-describedby="emailHelp"
                            placeholder="Enter your number"
                            value={mobileNumber}
                            onChange={(e) => {setMobileNumber(e.target.value)}}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pass">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="pass"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="error">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id={(password !== conPass) ? "error" : "confirm"}
                            value={conPass}
                            placeholder="Password"
                            onChange={(e) => {setConPass(e.target.value)}}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary bg-slate-500">
                        Register
                    </button>
                    <button className='btn btn-primary ml-80'><Link to='/login' id='login_signup'>Already a user?</Link></button>
                </form>
            </div>
        </>
    );
}

export default Register;