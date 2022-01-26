import React from 'react';
import "./PendingPayments.scss"
import Footer from '../Footer/Footer'
import Button from '@mui/material/Button'
import axios from 'axios'
import {connect} from 'react-redux'

function PendingPayments(props) {
    const [data,setData]=React.useState([])
    const [flag,setFlag]=React.useState(false)
    
    const openPayModal = (actualAmount,serviceId,serviceName) => {
        
        let amount  = actualAmount * 100
        const options = {
          key: 'rzp_test_Sn8RPLYLlLXlyD',
          amount, //  = INR 1
          name: 'Online Service',
          description: 'some description',
          image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
          handler: function(response) {
              console.log(response);
              axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/user/storepayment`,{amount,rId:response.razorpay_payment_id,serviceId,serviceName},{headers:{token:props.user.user}})
              .then(res=>{
                console.log(res);
                setFlag(!flag)
              })
              .catch(err=>{
                console.log(err);
              })
          },
          prefill: {
              name: 'Gaurav',
              contact: '9999999999',
              email: 'demo@demo.com'
          },
          notes: {
              address: 'some address'
          },
          theme: {
              color: 'blue',
              hide_topbar: false
          }
      };
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
      };
      React.useEffect(() => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          document.body.appendChild(script);
          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/getallpaymentrequest`,{headers:{token:props.user.user}})
          .then(res=>{
              console.log(res);
              setData(res.data.resp)
          })
          .catch(err=>{
              console.log(err);
          })
      }, [flag]);
    
  return <div className="pendingpy">
      <h1>Pending Payments</h1>
      <div className="pendingcont">
           
            {
                data.length>0?data.map((item,index)=>(
                    <div key={index} className="shadow-sm pending-card">
                    <p>Payment of <b>{item.amount}</b> pending for your {item.name} service</p>
                    <div style={{textAlign:"right"}}>
                    <Button onClick={()=>openPayModal(item.amount,item.serviceId,item.name)} variant="contained" className="btn">Pay now</Button>
                    </div>
                </div>
                )):<p>No Pending Payments</p>
            }
      </div>
      <Footer />
  </div>;
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(PendingPayments);
