import {Link , useNavigate} from 'react-router-dom';
import { useState } from "react";

function Login(){

    const navigate = useNavigate();

    const [email , setEmail] = useState('');
    const [password , setPass] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        const fuddu = {email , password};

        const response = await fetch('/api/login' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(fuddu)
        })

        const json = await response.json();

        setEmail('');
        setPass('');

        if(!response.ok){
            return alert("Invalid credentials!");
        }

        const userId = json.user._id
        localStorage.setItem("id" , userId);
        
        console.log(userId);
        


        localStorage.setItem("authToken" , json.auth);
        localStorage.setItem("firstName" , json.user.firstName);
        localStorage.setItem("wallet" , json.user.runningBalance.wallet);
        localStorage.setItem("gold" , json.user.runningBalance.gold);
        localStorage.setItem("email" , json.user.email);

        alert("Login successful!");
        navigate('/');

    }

    return (

        <>
            <div className="signup-form login-page">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control focus:ring-1"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control focus:outline-none focus:ring-1"
                            id="pass"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=>{setPass(e.target.value)}}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary bg-slate-500">
                        Login
                    </button>

                    <button className='btn btn-primary ml-52'><Link to='/register' id='login_signup'>New user?</Link></button>
                </form>
            </div>
        </>
        
    );
}

export default Login;