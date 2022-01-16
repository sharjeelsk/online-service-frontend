import React from 'react'
import "./BackOffice.scss"
import axios from 'axios'


function BackOffice() {
    const [data,setData]=React.useState([])
    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/service/getallservices`)
        .then(res=>{
            console.log(res.data)
            let arr = []
            res.data.map(item=>item.services.map(ser=>arr.push(ser)))
            console.log(arr);
            setData(arr)

        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <div className="backoffice">
            <h1>Back Office</h1>

            <table class="ui celled table">
            <thead>
                <tr><th>Name</th>
                <th>Work Description</th>
                <th>Janitors</th>
                <th>Subscription</th>
                <th>Start Date</th>
                <th>From Time</th>
                <th>To Time</th>
                <th>Address1</th>
                <th>Address2</th>
                <th>Location</th>
                <th>Janitor/Day</th>

            </tr></thead>
            <tbody>
               
                {
                    data.length>0?(
                        data.map(item=>(
                            <tr>
                            <td>{item.name}</td>
                            <td >{item.workdescription}</td>
                            <td>{item.janitors}</td>
                            <td>{item.subscription?item.subscription:null}</td>
                            <td>{item.startDate}</td>
                            <td>{item.fromtime}</td>
                            <td>{item.totime}</td>
                            <td>{item.address1}</td>
                            <td>{item.address2}</td>
                            <td>lat : {item.location.lat} long:{item.location.lng}</td>
                            <td>{item.hirejanitor?"true":"false"}</td>
                            </tr>
                        ))
                    ):null
                }
                

                
            </tbody>
            </table>
        </div>
    )
}

export default BackOffice
