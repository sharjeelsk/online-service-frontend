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
    const [janitorList,setJanitorList]=React.useState([])
    const {register,handleSubmit,formState:{errors},setValue}=useForm()
    React.useEffect(()=>{
      
    },[])

    const onSubmit = (data)=>{
     console.log(data);
     if(!janitorList.includes(data.janitor)){
      let janitornamelist = props.janitors.filter(item=>item!==data.janitor)
      props.setJanitors(janitornamelist)
      setJanitorList([...janitorList,data.janitor])
     }
     
    }

    const handleRemove = (data)=>{
        let janitorl= janitorList.filter(item=>item!==data)
        props.setJanitors([...props.janitors,data])
        setJanitorList(janitorl)
    }
    console.log(janitorList);

    const handleFormSubmit =()=>{
        let idObject = props.janitorList.map(item=>{
            if(janitorList.includes(item.name)){
                return item._id
            }else{
                return null;
            }
        })
        idObject = idObject.filter(item=>item!==null)

        console.log(props.user);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/addjanitortoservice`,{serviceId:props.id,janitors:idObject},{headers:{token:props.user}})
        .then(res=>{
            console.log(res);
        props.history.push("/bservices")
            props.setOpen(false)
        })
        .catch(err=>{
            console.log(err.response);
            props.setOpen(false)
        })
    }

  return (
    <div>
      <Dialog open={props.open} onClose={()=>props.setOpen(false)}>
        <DialogTitle>Add Janitors to service</DialogTitle>
        <form onSubmit = {handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            Note : After adding janitors to a particular service their status will change to busy
          </DialogContentText>
          <div className="mt-3 mx-auto">
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={props.janitors}
            renderInput={(params) => <TextField {...register('janitor',{required:true})} {...params} label="Janitors" />}
            />
            <Button className="mt-3" type="submit">Add Janitor</Button>
            <div>
            {
                janitorList.length>0?(
                    janitorList.map(item=>(
                    <Chip className="m-2" label={item} onDelete={()=>handleRemove(item)} />
                    ))
                ):null
            }
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.setOpen(false)}>Cancel</Button>
          <Button onClick={()=>handleFormSubmit()}>Submit</Button>
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