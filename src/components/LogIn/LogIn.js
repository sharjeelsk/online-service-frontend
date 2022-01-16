import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'
import {useForm} from 'react-hook-form'

function LogIn() {
    const {handleSubmit,register,formState:{errors}}=useForm()

    const onSubmit =(data)=>{
        console.log(data);
    }
    return (
        <div>
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>LogIn</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField className="mt-2" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField className="mt-5" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                
                <Button className="mt-3">Forgot Password</Button>
                <div style={{textAlign:"center"}} className="mt-5">
                <Button className="mybtn" variant="contained">LogIn</Button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn
