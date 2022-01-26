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

function Otp(props) {
    const {handleSubmit,register,formState:{errors},setError}=useForm()
    const [loading,setLoading]=React.useState(false)
    const [otp,setOtp]=React.useState("")
    const onSubmit =(data)=>{
        let otpI = parseInt(data.otp)

        if(otpI===otp){
            console.log("verified");
            props.history.push("/forgotpassword",otp)
        }else{
            setError("otp",{message:"invalid"})
        }
    }
    React.useEffect(()=>{
        var val = Math.floor(1000 + Math.random() * 9000);
        setOtp(val)
        console.log(val);
    },[])
    return (
        <div>
             <SimpleBackdrop open={loading} />
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>OTP</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField helperText={errors.otp?"Invalid OTP":null} error={errors.otp?true:false} {...register('otp',{required:true})} className="mt-2" fullWidth id="outlined-basic" label="Enter Otp" variant="outlined" />
                
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

export default connect(null,mapDispatchToProps)(Otp)
