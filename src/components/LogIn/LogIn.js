import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'
import {useForm} from 'react-hook-form'
import {setUser} from '../redux/user/userActions'
import axios from 'axios'
import {connect} from 'react-redux'

function LogIn(props) {
    const {handleSubmit,register,formState:{errors},setError}=useForm()

    const onSubmit =(data)=>{
        console.log(data);
        const {email,password}=data;
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/login`,{email,password})
        .then(res=>{
            console.log(res);
            props.setUser(res.data.token)
            props.history.push("/selectservice")

        })
        .catch(err=>{
            console.log(err.response);
            if(err.response.data.msg!=="User doesn't exists"){
                setError('password',{message:err.response.data.msg})
            }else{
                setError('email',{message:"User doesn't exists"})
            }
        })

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
                <TextField helperText={errors.email?errors.email.message:null} error={errors.email?true:false} {...register('email',{required:true})} className="mt-2" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField helperText={errors.password?errors.password.message:null} error={errors.password?true:false} {...register('password',{required:true})} className="mt-5" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                
                <Button className="mt-3">Forgot Password</Button>
                <div style={{textAlign:"center"}} className="mt-5">
                <Button type="submit" className="mybtn" variant="contained">LogIn</Button>
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

export default connect(null,mapDispatchToProps)(LogIn)
