import React from 'react'
import "./LogIn.scss"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthImg from '../images/authimg.jpeg'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {setUser} from '../redux/user/userActions'
import {connect} from 'react-redux'
import SimpleBackdrop from '../SimpleBackdrop'
function ForgotPassword(props) {
    console.log("forgotpassword",props);
    const {handleSubmit,register,formState:{errors},setError}=useForm()
    const [errormsg,setErrorMsg]=React.useState("")
    const [loading,setLoading]=React.useState(false)

    const onSubmit =(data)=>{
        if(data.confirmpassword!==data.password){
            setError("confirmpassword")
        }else{
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/forgetpassword`,{email:data.email,password:data.password})
            .then(res=>{
                console.log(res);
                props.history.push("/login")
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    return (
        <div>
            <SimpleBackdrop open={loading} />

            {
            props.location.state?
            <div>            
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>Update Password</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField error={errors.email?true:false} {...register('email',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField error={errors.password?true:false} {...register('password',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <TextField error={errors.confirmpassword?true:false} {...register('confirmpassword',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" />
             
                <div style={{textAlign:"center"}} className="mt-5">
                <Button type="submit" className="mybtn" variant="contained">Update</Button>
                </div>
                </form>
            </div>
            </div>:null
            }


        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        setUser:(user)=>dispatch(setUser(user))
    }
}

export default connect(null,mapDispatchToProps)(ForgotPassword)