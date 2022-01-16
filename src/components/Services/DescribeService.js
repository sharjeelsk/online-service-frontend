import React from 'react'
import {ReactComponent as Stepper} from '../images/Component 46 – 2.svg'
import "./Services.scss"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function DescribeService(props) {
    const [janitors, setJanitors] = React.useState('');

    const handleChange = (event) => {
      setJanitors(event.target.value);
    };
    const handleSubmit = ()=>{
        props.history.push("selecttimeservice")
    }
    return (
        <div>
             <h1 className="no-more-excuses">No<br />More<br />Excuses</h1>
             <div className="row mx-5">
                 <div className="col-3 svgcol">
                    <Stepper className="svg" />
                 </div>

                 <div className="col-9 servcol describeservice">
                    <h1>Describe Service</h1>
                    <TextField
                        id="outlined-multiline-static"
                        label="Explain Your Work"
                        multiline
                        rows={4}
                        sx={{width:"30%"}}
                        className="tf"
                        />

                <div className="selection">
                <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-filled-label">Select Janitors</InputLabel>
                        <Select
                        labelid="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={janitors}
                        label="janitors"
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


                </div>



                </div>
            </div>
        </div>
    )
}

export default DescribeService
