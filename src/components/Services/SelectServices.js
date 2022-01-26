import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 1.svg'
import {ReactComponent as StepperMobile} from '../images/Component 50 – 1.svg'
import "./Services.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TextField from '@mui/material/TextField'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {useForm} from 'react-hook-form'
import Alert from '@mui/material/Alert'
import axios from 'axios'
import Footer from '../Footer/Footer'
function SelectServices(props) {
    const [serviceName,setServiceName]=React.useState("")
    const [location,setLocation]=React.useState({lat:"",lng:""})
    const [error,setError]=React.useState("")
    const {handleSubmit,formState:{errors},register} = useForm()
    console.log(location)
    const handleChange = (e)=>{
        setServiceName(e.target.value)
        // setTimeout(() => {
        //     props.history.push("/describeservice")
            
        // }, 500);
    }
    const getGeo = async ()=>{
        window.navigator.geolocation.getCurrentPosition((loca)=>{
          setLocation({lat:loca.coords.latitude,lng:loca.coords.longitude})
        },(err)=>setError(err.message));
      }

      const onSubmit = (data)=>{
        console.log(data);
        //
        if(serviceName==="" || location.lat===""){
          setError("you are missing something, crosscheck the data")
        }else{
          setError("")
          props.history.push("/describeservice",{formOneData:{data,location,serviceName}})
        }
      }

      
      

    return (
        <div>
             <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
             <div className="row">
                 <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 svgcol">
                    <Stepper className="svg" />
                    <StepperMobile className="svgmob" />
                 </div>

                 <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 servcol">
                    <h1>Select Services</h1>
                    <RadioGroup onChange={(e)=>handleChange(e)} className="radiogroup" row aria-label="gender" name="row-radio-buttons-group">
                        <FormControlLabel  className="formlabel" value="Commercial" control={<Radio
                         sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 25,
                            },
                          }}
                        />} label="Commercial" />
                        <FormControlLabel  className="formlabel" value="Household" control={<Radio
                        sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 25,
                            },
                          }}
                        />} label="Household" />
                        <FormControlLabel  className="formlabel" value="Office" control={<Radio 
                        sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 25,
                            },
                          }}
                        />} label="Office" />
                    </RadioGroup>

                    {location.lat===""?<Button onClick={()=>getGeo()} startIcon={<LocationOnIcon />} className="my-3">Select Current location</Button>:<Button disabled onClick={()=>getGeo()} startIcon={<LocationOnIcon />} className="my-3">Current location selected</Button>}
                    <form onSubmit = {handleSubmit(onSubmit)}>
                    <TextField error={errors.address?true:false} {...register('address',{required:true})} className="tf" fullWidth id="outlined-basic" variant="outlined" label="Enter address" />
                    <TextField {...register('address1')} className="tf" fullWidth id="outlined-basic" variant="outlined" label="Enter second address (optional)" />
                    <div className="mt-2" style={{textAlign:"right"}}>
                    <Button type="submit" endIcon={<NavigateNextIcon />}>Next</Button>
                    </div>
                    {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
                    </form>
                 </div>
             </div>
             <Footer />
        </div>
    )
}

export default SelectServices
