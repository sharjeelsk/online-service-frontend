import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'

function SignUp() {
    return (
        <div>
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>SignUp</h1>
                <form>
                <TextField className="mt-2" fullWidth id="outlined-basic" label="Name" variant="outlined" />
                <TextField className="mt-4" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField className="mt-4" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <TextField className="mt-4" fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" />

                
                <div style={{textAlign:"center"}} className="mt-5">
                <Button className="mybtn" variant="contained">SignUp</Button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
