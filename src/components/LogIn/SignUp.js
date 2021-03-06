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
function SignUp(props) {
    const {handleSubmit,register,formState:{errors},setError}=useForm()
    const [errormsg,setErrorMsg]=React.useState("")
    const [loading,setLoading]=React.useState(false)

    const onSubmit =(data)=>{
        console.log(data);
        if(data.confirmpassword!==data.password){
            setError("confirmpassword")
        }else{
            setLoading(true)
            const {email,name,password,mobileno}=data;
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/signup`,{email,name,password,mobileno})
            .then(res=>{
                console.log(res);
                setLoading(false)
                if(res.status===200){
                    setErrorMsg("User already exists, login instead")
                }else{
                    props.setUser(res.data.token)
                    props.history.push("/selectservice")
                }
            })
            .catch(err=>{
                setLoading(false)
                console.log(err.message);
            })
        }
    }
    return (
        <div>
            <SimpleBackdrop open={loading} />
            <div className="row justify-content-between m-auto">
            <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
            <img className="imgauth" src={AuthImg} alt="imgauth" />
            </div>
            <div className="login">
                <h1>SignUp</h1>
                <form onSubmit ={handleSubmit(onSubmit)}>
                <TextField error={errors.name?true:false} {...register('name',{required:true})} className="mt-2" fullWidth id="outlined-basic" label="Name" variant="outlined" />
                <TextField error={errors.email?true:false} {...register('email',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Email" variant="outlined" />
                <TextField error={errors.mobileno?true:false} {...register('mobileno',{required:true})} className="mt-4" fullWidth id="outlined-basic" variant="outlined" label="Mobile Number" />
                <TextField error={errors.password?true:false} {...register('password',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Password" variant="outlined" />
                <TextField error={errors.confirmpassword?true:false} {...register('confirmpassword',{required:true})} className="mt-4" fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" />
                <div style={{textAlign:"right"}} className="mt-3">
                    <Button onClick={()=>props.history.push("/login")}>LogIn instead</Button>
                </div>
                
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

export default connect(null,mapDispatchToProps)(SignUp)