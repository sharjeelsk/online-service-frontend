import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'
import {useForm} from 'react-hook-form'
import {setUser} from '../redux/user/userActions'
import axios from 'axios'
import {connect} from 'react-redux'
import SimpleBackdrop from '../SimpleBackdrop'

function Email(props) {
    const {handleSubmit,register,formState:{errors},setError}=useForm()
    const [loading,setLoading]=React.useState(false)
    const onSubmit =(data)=>{
        console.log(data);
        props.history.push('otp')        
    }
    return (
        <div>
             <SimpleBackdrop open={loading} />
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>Email registered email</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField helperText={errors.email?"Invalid Email":null} error={errors.otp?true:false} {...register('email',{required:true})} className="mt-2" fullWidth id="outlined-basic" label="Enter Email" variant="outlined" />
                
                <div style={{textAlign:"center"}} className="mt-5">
                <Button type="submit" className="mybtn" variant="contained">Verify</Button>
                </div>
                </form>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return{
        setUser:(user)=>dispatch(setUser(user))
    }
}

export default connect(null,mapDispatchToProps)(Email)
