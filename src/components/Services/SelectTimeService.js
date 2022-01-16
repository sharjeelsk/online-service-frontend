import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 3.svg'
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function SelectTimeService() {
    const [fromdate, setFromDate] = React.useState(null);
    const [fromTime, setFromTime] = React.useState(null);
    const [toTime,setToTime]=React.useState(null)
    const [subscription, setSubscription] = React.useState('');

    const handleChange = (event) => {
      setSubscription(event.target.value);
    };
    return (
        <div>
             <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
             <div className="row mx-5">
                 <div className="col-3 svgcol">
                    <Stepper className="svg" />
                 </div>

                 <div className="col-9 servcol selecttimedate">
                    <h1>Select date and time</h1>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>


                    <div className='mt-5'>
                    <DatePicker
                        label="From date"
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
                    <FormControlLabel control={<Checkbox  />} label="Hire janitor just for a day" />
                    </FormGroup>
                        
                    <div className="mt-4" style={{textAlign:"right"}}>
                    <Button endIcon={<NavigateNextIcon />} variant="text">Submit</Button>
                    </div>


                    </div>



                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}

export default SelectTimeService
