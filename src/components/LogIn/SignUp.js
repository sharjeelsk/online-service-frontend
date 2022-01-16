import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {setUser} from '../redux/user/userActions'
import {connect} from 'react-redux'
function SignUp(props) {
    const {handleSubmit,register,formState:{errors},setError}=useForm()
    const [errormsg,setErrorMsg]=React.useState("")

    const onSubmit =(data)=>{
        console.log(data);
        if(data.confirmpassword!==data.password){
            setError("confirmpassword")
        }else{
            const {email,name,password}=data;
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/signup`,{email,name,password})
            .then(res=>{
                console.log(res);
                if(res.status===200){
                    setErrorMsg("User already exists, login instead")
                }else{
                    props.setUser(res.data.token)
                    props.history.push("/selectservice")
                }
            })
            .catch(err=>{
                console.log(err.message);
            })
        }
    }
    return (
        <div>
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>SignUp</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField error={errors.name?true:false} {...register('name',{required:true})} className="mt-2" fullWidth id="outlined-basic" label="Name" variant="outlined" />
                <TextField error={errors.email?true:false} {...register('email',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField error={errors.password?true:false} {...register('password',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <TextField error={errors.confirmpassword?true:false} {...register('confirmpassword',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" />

                
                <div style={{textAlign:"center"}} className="mt-5">
                <Button type="submit" className="mybtn" variant="contained">SignUp</Button>
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

export default connect(mapDispatchToProps)(SignUp)