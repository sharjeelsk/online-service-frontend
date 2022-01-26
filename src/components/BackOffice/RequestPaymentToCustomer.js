import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {connect} from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import Chip from '@mui/material/Chip';
function AddJanitorsToService(props) {
    console.log(props);
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    React.useEffect(()=>{
      
    },[])

    const onSubmit = (data)=>{
        const {serviceName,userId,serviceId}=props;
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/reqpayment`,{serviceName,userId,serviceId,amount:data.amount},{headers:{token:props.user}})
        .then(res=>{
            console.log(res);
            props.history.push('/bservices')
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // /!req.body.serviceName || !req.body.userId || !req.body.amount || !req.body.serviceId

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <DialogTitle>Request payment to customer</DialogTitle>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Note : After adding janitors to a particular service their status will change to busy
          </DialogContentText>
          <div className="mt-3 mx-auto">
          <TextField {...register('amount',{required:true})} id="outlined-basic" variant="outlined" label="Amount" />
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser.user
    }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(AddJanitorsToService);