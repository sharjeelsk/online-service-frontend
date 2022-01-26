import React from 'react';
import "./BServices.scss"
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip'
import AddJanitorsToService from './AddJanitorsToService';
import RequestPaymentToCustomer from './RequestPaymentToCustomer';
import CreateServiceReport from './CreateServiceReport'
import axios from 'axios';
import {connect} from 'react-redux'
function BServiceDetail(props) {
    console.log(props);
    const [id,setId]=React.useState([])
    const [open,setOpen]=React.useState(false)
    const [open2,setOpen2]=React.useState(false)
    const [open3,setOpen3]=React.useState(false)
    const [janitors,setJanitors]=React.useState([])
    const [janitorList,setJanitorList]=React.useState([])
    const [disabled,setDisabled]=React.useState(false)
    let details = props.location.state;
    details.janitors = details.janitors.map((item,index)=>({id:index+1,...item}))

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/janitor/getallfreejanitor`,{headers:{token:props.user}})
        .then(res=>{
            setJanitorList(res.data)
            let j = res.data.map(item=>item.name)
            setJanitors(j)
            if(details.user[0].reqPayments.length>0){
              details.user[0].reqPayments.map(item=>{
                if(item.serviceId===details._id){
                  setDisabled(true)
                }
              })
            }else{
              setDisabled(false)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const handleDelete=()=>{
        let arr = id.map((item)=>{
            return details.janitors[item-1]._id
        })
        console.log(arr);
        axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/service/removejanitorfromservice`,{serviceId:details._id,janitors:arr},{headers:{token:props.user}})
        .then(res=>{
            console.log(res);
            props.history.push("/bservices")
        })
        .catch(err=>{
            console.log(err);
        })
    }
    console.log(id);

  return <div className="bservicedetail">
      <AddJanitorsToService 
      open={open}
      setOpen={setOpen}
      janitors={janitors}
      setJanitors={setJanitors}
      janitorList = {janitorList}
      id={details._id}
      />
      <RequestPaymentToCustomer 
      open={open2}
      setOpen={setOpen2}
      serviceName={details.name}
      serviceId={details._id}
      userId={details.user[0]._id}
      />
      <CreateServiceReport 
      open={open3}
      setOpen={setOpen3}
      serviceId={details._id}
      />
      <h1>Service Details</h1>
      <p>Name : <b>{details.name}</b></p>
      <p>Mobile : <b>{details.user[0].mobileNo}</b></p>
      <p>Description : <b>{details.workDescription}</b></p>
      <p>Subscription : <b>{details.subscription}</b></p>
      <p>Start Date : <b>{details.startDate}</b></p>
      <p>From Time : <b>{details.fromTime}</b></p>
      <p>To Time : <b>{details.toTime}</b></p>
      <div className="row m-auto">
        <p>Longitude : <b>{details.location.lng}</b></p>
        <p className="ml-2">Latitude : <b>{details.location.lat}</b></p>
      </div>
      <p>Address 1 : <b>{details.serviceAddress}</b></p>
      <p>Address 2 : <b>{details.serviceAddress2}</b></p>
      <div className="row m-auto">
        <p>Working Janitors : <b>{details.workingJanitors}</b></p>
        <p className="ml-2">Total Janitors : <b>{details.totalJanitors}</b></p>
      </div>

      {details.transaction?<div className="my-5">
        <h3>Transaction Info</h3>
        <p>OrderId : <b>{details.transaction.id}</b></p>
        <p>Amount : <b>{details.transaction.amount/10000}</b></p>
        <p>Amount Due : <b>{details.transaction.amount_due/10000}</b></p>
        <p>Amount Paid : <b>{details.transaction.amount_paid}</b></p>
      </div>
      :null}

      {
        details.serviceReport?<div className="my-5">
          <h3>Service Report</h3>
          <p>Description : <b>{details.serviceReport.description}</b></p>
          <p>Start Date : <b>{details.serviceReport.startDate}</b></p>
          <p>From Time : <b>{details.serviceReport.fromtime}</b></p>
          <p>To Time : <b>{details.serviceReport.totime}</b></p>
          </div>:null
      }

      <Button disabled={disabled} onClick={()=>setOpen2(true)}>request payment to customer</Button>
      <Button onClick={()=>setOpen3(true)}>create service report</Button>

      <h3>Working Janitors</h3>
    <Button onClick={()=>setOpen(true)}>Add Janitors to service</Button>
    <div style={{ height: '50vh', width: '100%' }}>
    <DataGrid
        rows={details.janitors}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(e)=>setId(e)}
      />
      </div>

      
      <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Remove Janitors">
              <Fab onClick={()=>handleDelete()} color="primary" variant="extended">
                Remove Janitors
                <NavigationIcon sx={{ ml: 1 }} />
                </Fab>
              </Tooltip>
            </div>

  </div>;
}

const mapStateToProps = ({EventUser})=>{
  return {
    user:EventUser.user
  }
}

export default connect(mapStateToProps)(BServiceDetail);

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: '_id', headerName: '_ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'dateOfJoining', headerName: 'Date of joining', width: 130 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'busy', headerName: 'Busy', width: 130 },
    { field: 'documents', headerName: 'Documents', width: 200 },
    
  ];
