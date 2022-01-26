import React from 'react';
import "./BServices.scss"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import {connect} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
function BServices(props) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rows,setRows]=React.useState([])
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    React.useEffect(() =>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/service/getallservices`,{headers:{token:props.user}})
        .then(res=>{
            console.log(res);
            if(res.data.length>0){
                let arr = res.data.map((item,index)=>({id:index+1,...item,workingJanitors:item.janitors.length}))
                setRows(arr)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    console.log(rows);


  return <div className="bservices">
      <h1>All Services</h1>
      <div style={{textAlign:"right"}}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        services
      </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Services</MenuItem>
        <MenuItem onClick={()=>{
            props.history.push("/bjanitors")
        }}>Janitors</MenuItem>
      </Menu>

      <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={(item)=>props.history.push("bservicedetail",item.row)}
      />
    </div>






  </div>;
}

const mapStateToProps =({EventUser})=>{
    return {
        user:EventUser.user
    }
}

export default connect(mapStateToProps)(BServices);

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'workDescription', headerName: 'Description', width: 130 },
    { field: 'totalJanitors', headerName: 'Total Janitors', width: 130 },
    { field: 'workingJanitors', headerName: 'Working Janitors', width: 130 },
    { field: 'startDate', headerName: 'Start Date', width: 130 },
    { field: 'fromTime', headerName: 'From Time', width: 130 },
    { field: 'toTime', headerName: 'To Time', width: 130 },
    { field: 'subscription', headerName: 'Subscription', width: 130 },
    { field: 'serviceAddress', headerName: 'Address 1', width: 150 },
    { field: 'serviceAddress2', headerName: 'Address 2', width: 150 },
    
  ];