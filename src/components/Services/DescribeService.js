import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 2.svg'
import {ReactComponent as StepperMobile} from '../images/Component 50 – 1.svg'
import "./Services.scss"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function DescribeService(props) {
    const [janitors, setJanitors] = React.useState('');
    const [description,setDescription]=React.useState("")
    const [error,setError]=React.useState("")
    console.log(props)
    const handleChange = (event) => {
      setJanitors(event.target.value);
    };
    const handleSubmit = ()=>{
        if(description==="" ||janitors===""){
            setError("you are missing something, crosscheck the data")
        }else{
            props.history.push("selecttimeservice",{formOneData:props.location.state.formOneData,description,janitors})

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

                 <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 servcol describeservice">
                    <h1>Describe Service</h1>
                    <TextField
                        id="outlined-multiline-static"
                        label="Explain Your Work"
                        multiline
                        rows={4}
                        sx={{width:"30%"}}
                        className="tf"
                        onChange={(e)=>setDescription(e.target.value)}
                        />

                <div className="selection">
                <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-filled-label">Select Janitors</InputLabel>
                        <Select
                        labelid="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={janitors}
                        label="Select Janitors"
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>

                <div className="btn-div">
                <Button endIcon={<NavigateNextIcon />} onClick={()=>handleSubmit()} className="btn">Next</Button>
                </div>
                {error.length>0?<Alert className="alert" severity="error">{error}</Alert>:null}

                </div>



                </div>
            </div>
        </div>
    )
}

export default DescribeService
