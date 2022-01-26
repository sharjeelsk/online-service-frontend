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
import {withRouter} from 'react-router-dom'
import Chip from '@mui/material/Chip';
import {compose} from 'redux'
function AddJanitors(props) {
    console.log(props);
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    const [doc,setDoc]=React.useState([])
    const [docText,setDocText]=React.useState("")
    React.useEffect(()=>{
      
    },[])

    const onSubmit = (data)=>{
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/janitor/addjanitor`,{name:data.name,description:data.description,address:data.address,dateOfJoining:data.dateofjoining,documents:doc},{headers:{token:props.user}})
        .then(res=>{
            console.log(res);
            props.setFlag(!props.flag)
            props.setOpen(false)
        })
        .catch(err=>{
            console.log(err);
            props.setOpen(false)
        })
    }

  

    const handleFormSubmit =()=>{
     
    }

    const addDoc = ()=>{
        if(!doc.includes(docText)){
            setDoc([...doc,docText])
        }
    }
    const removeDoc = ()=>{
        let arr = doc.filter(item=>item!==docText)
        setDoc(arr)
    }

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <DialogTitle>Add Janitors</DialogTitle>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Note : Janitors will be added after submitting this form
          </DialogContentText>
          <div className="mt-3 mx-auto">
          <TextField className="my-3" fullWidth {...register('name',{required:true})} id="outlined-basics" variant="outlined" label="Name" />
          <TextField className="my-3" fullWidth {...register('description',{required:true})} id="outlined-basics" variant="outlined" label="Description" />
          <TextField className="my-3" fullWidth {...register('address',{required:true})} id="outlined-basics" variant="outlined" label="Address" />
          <TextField className="my-3" fullWidth {...register('dateofjoining',{required:true})} id="outlined-basics" variant="outlined" label="Date of Joining" />
          <div className="row m-auto">
          <TextField onChange={(e)=>setDocText(e.target.value)} className="my-3" id="outlined-basics" variant="outlined" label="Document" />
          <Button className="ml-3" onClick={()=>addDoc()}>Add Document</Button>
         
          </div>
          {
              doc.map(item=><Chip className="m-2" label={item} onDelete={()=>removeDoc()} />
              )
          }
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
)(AddJanitors);