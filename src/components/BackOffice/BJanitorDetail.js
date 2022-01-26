import React from 'react';
import "./BServices.scss"
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip'
import AddJanitorsToService from './AddJanitorsToService';
import axios from 'axios'
function BServiceDetail(props) {
    console.log(props);
    const [id,setId]=React.useState([])
    const [open,setOpen]=React.useState(false)
    const [janitors,setJanitors]=React.useState([])
    const [janitorList,setJanitorList]=React.useState([])
    let details = props.location.state;

    React.useEffect(()=>{
      
    },[])

  

  return <div className=" bservicedetail">
   


      <div>
      <h1>Janitor Details</h1>
      <p>Name : <b>{details.name}</b></p>
      <p>Description : <b>{details.description}</b></p>
      {/* <p>Documents : <b>{details.documents}</b></p> */}
      <p>Date of Joining : <b>{details.dateOfJoining}</b></p>
      <p>Address : <b>{details.address}</b></p>
      <p>Busy : <b>{details.busy.toString()}</b></p>
      <p>Documents :</p>
      {
          details.documents.length>0?(
              details.documents.map((item,index)=><p key={index}><b>{item}</b></p>)
          ):null
      }
      </div>

        {details.services.length>0?<div>
      <h1 className="mt-5">Jantior Service</h1>
      <p>ObjectId : <b>{details.services[0]._id}</b></p>
      <p>Name : <b>{details.services[0].name}</b></p>
      <p>Description : <b>{details.services[0].workDescription}</b></p>
      <p>Subscription : <b>{details.services[0].subscription}</b></p>
      <p>Start Date : <b>{details.services[0].startDate}</b></p>
      <p>From Time : <b>{details.services[0].fromTime}</b></p>
      <p>To Time : <b>{details.services[0].toTime}</b></p>
      <div className="row m-auto">
        <p>Longitude : <b>{details.services[0].location.lng}</b></p>
        <p className="ml-2">Latitude : <b>{details.services[0].location.lat}</b></p>
      </div>
      <p>Address 1 : <b>{details.services[0].serviceAddress}</b></p>
      <p>Address 2 : <b>{details.services[0].serviceAddress2}</b></p>
      </div>:null}
    {/* <Button onClick={()=>setOpen(true)}>Add Janitors to service</Button>
    <div style={{ height: '50vh', width: '100%' }}>
    <DataGrid
        rows={details.janitors}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e)=>setId(e)}
      />
      </div> */}

      
      {/* <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Remove Janitors">
              <Fab onClick={()=>handleDelete()} color="primary" variant="extended">
                Remove Janitors
                <NavigationIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
            </div> */}

  </div>;
}

export default BServiceDetail;

