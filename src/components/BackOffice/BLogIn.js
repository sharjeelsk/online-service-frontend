import React from 'react';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import "./BLogIn.scss"
import axios from 'axios'
import Alert from '@mui/material/Alert'
import {setUser} from '../redux/user/userActions'
import {connect} from 'react-redux'
import SimpleBackdrop from '../SimpleBackdrop';

function BLogIn(props) {
    const [loading,setLoading]=React.useState(false)
    const {handleSubmit,register,formState:{errors}}=useForm()
    const [error,setError]=React.useState("")

    const onSubmit = (data)=>{
        console.log(data);
        setLoading(true)
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/admin/login`,{email:data.email,password:data.password})
        .then(res=>{
            setLoading(false)
            console.log(res);
            if(res.data.token){
                props.setUser(res.data.token)
                props.history.push("/bservices")
            }
        })
        .catch(err=>{
            setLoading(false)
            setError("Invalid Credentials")
        })

    }
  return (
  <div className="blogin">
      <SimpleBackdrop open={loading} />
    <h1>Admin Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('email',{required:true})} className="textfield" fullWidth id="outlined-basic" variant="outlined" label="Email" />
        <TextField {...register('password',{required:true})} className="textfield" fullWidth id="outlined-basic" variant="outlined" label="Password" />
        {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
        <Button type="submit" className="bt" variant="contained">LogIn</Button>
    </form>

  </div>
  )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setUser:(user)=>dispatch(setUser(user))
    }
}

export default connect(null,mapDispatchToProps)(BLogIn);
