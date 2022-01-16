import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 3.svg'
import {ReactComponent as StepperMobile} from '../images/Component 50 – 1.svg'
import "./Services.scss"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import date from 'date-and-time'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios'
import {connect} from 'react-redux'
function SelectTimeService(props) {
    console.log(props)
    const [fromdate, setFromDate] = React.useState(null);
    const [fromTime, setFromTime] = React.useState(null);
    const [toTime,setToTime]=React.useState(null)
    const [subscription, setSubscription] = React.useState('');
    const [error,setError]=React.useState("")
    const [checked,setChecked]=React.useState(false)

    const handleChange = (event) => {
      setSubscription(event.target.value);
    };
    const handleSubmit = ()=>{
        if(!fromdate || !fromTime || !toTime || subscription===''){
            setError("you are missing something, crosscheck the data")
        }else{
            let fromtime = date.format(fromTime, 'HH:mm:ss');
            let fromDate = date.format(fromdate, 'DD/MM/YYYY');
            let totime = date.format(toTime, 'HH:mm:ss');
            let Data = props.location.state;

            console.log(fromtime,fromDate,totime,subscription,checked,Data);
            axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/addservice`,{name:Data.formOneData.serviceName,startDate:fromDate,fromtime,totime,hirejanitor:checked,janitors:Data.janitors,workdescription:Data.description,location:Data.formOneData.location,address1:Data.formOneData.data.address,address2:Data.formOneData.data.address1,subscription:subscription===1?"Weekly Subscription":"Monthly Subscription"},{headers:{token:props.user.user}})
            .then(res=>{
                console.log(res);
                props.history.push("selectservice")
            })
            .catch(err=>{
                console.log(err.response);
                if(err.response.status===400){
                    setError("Service already added")
                }
            })
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

                 <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 servcol describeservice selecttimedate">
                    <h1>Select date and time</h1>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>


                    <div className='mt-5'>
                    <DatePicker
                        inputFormat="dd/MM/yyyy"
                        label="From date"
                        minDateTime={new Date(Date.now())}
                        value={fromdate}
                        onChange={(newValue) => {
                            setFromDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </div>


                    <div className="my-4">
                     <TimePicker
                        label="From Time"
                        value={fromTime}
                        onChange={(newValue) => {
                        setFromTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </div>


                    <div>
                     <TimePicker
                        label="To Time"
                        value={toTime}
                        onChange={(newValue) => {
                            setToTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </div>

                    
                    <div className="subs-div">
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Subscription</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subscription}
                            label="Select Subscription"
                            onChange={handleChange}
                            >
                            <MenuItem value={1}>Weekly Subscription</MenuItem>
                            <MenuItem value={2}>Monthly Subscription</MenuItem>
                            </Select>
                        </FormControl>

                    <FormGroup className="mt-3">
                    <FormControlLabel control={<Checkbox onChange={()=>setChecked(!checked)}  />} label="Hire janitor just for a day" />
                    </FormGroup>
                        
                    <div className="mt-4" style={{textAlign:"right"}}>
                    <Button onClick={()=>handleSubmit()} endIcon={<NavigateNextIcon />} variant="text">Submit</Button>
                    </div>

                    {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}
                    </div>



                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({EventUser})=>{
return {
    user:EventUser
}
}

export default connect(mapStateToProps)(SelectTimeService)
