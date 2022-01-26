import React from 'react';
import "./BJanitors.scss"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {connect} from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip'
import AddJanitors from './AddJanitors';
function BJanitors(props) {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rows,setRows]=React.useState([])
    const [flag,setFlag]=React.useState(false)
    const open = Boolean(anchorEl);
    const [openModal,setOpenModal]=React.useState(false)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    React.useEffect(()=>{
      axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/janitor/getalljanitor`,{headers:{token:props.user}})
      .then(res=>{
        console.log(res);
        if(res.data.length>0){
          let arr = res.data.map((item,index)=>({id:index+1,...item}))
          setRows(arr)
      }
      })
      .catch((err)=>{
        console.log(err);
      })
    },[flag])

    const handleJanitorAdd = ()=>{

    }

    

console.log("janitor rows",rows);
  return <div className="BJanitors">
    <AddJanitors 
    open={openModal}
    setOpen={setOpenModal}
    flag={flag}
    setFlag={setFlag}
    />
      <h1>Janitors</h1>
      <div style={{textAlign:"right"}}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        janitors
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
        <MenuItem onClick={()=>{
            props.history.push("/bservices")
        }}>Services</MenuItem>
        <MenuItem onClick={handleClose}>Janitors</MenuItem>
      </Menu>

      <div style={{ height: '60vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={(item)=>props.history.push("bjanitordetail",item.row)}
      />
    </div>
    <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add Janitors">
              <Fab onClick={()=>{
                setOpenModal(true)
              }} color="primary" variant="extended">
                Add Janitors
                <NavigationIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
      </div>
  </div>;
}

const mapStateToProps =({EventUser})=>{
  return {
      user:EventUser.user
  }
}

export default connect(mapStateToProps)(BJanitors);


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: '_id', headerName: 'ObjectID', width: 250 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'description', headerName: 'Description', width: 130 },
  { field: 'documents', headerName: 'Documents', width: 200 },
  { field: 'address', headerName: 'Address', width: 230 },
  { field: 'dateOfJoining', headerName: 'Date of Joining', width: 130 },
  { field: 'busy', headerName: 'Busy', width: 130 },
  
];