import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Comp404 from "./components/Comp404"
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/LogIn/SignUp';
import SelectServices from './components/Services/SelectServices';
import DescribeService from './components/Services/DescribeService'
import SelectTimeService from './components/Services/SelectTimeService';
import BackOffice from './components/Services/BackOffice'
import BLogIn from './components/BackOffice/BLogIn'
import BServices from './components/BackOffice/BServices';
import BJanitors from './components/BackOffice/BJanitors';
import {connect} from 'react-redux'
import BServiceDetail from './components/BackOffice/BServiceDetail';
import BJanitorDetail from './components/BackOffice/BJanitorDetail'
import OTP from './components/LogIn/Otp'
import ForgotPassword from './components/LogIn/ForgotPassword';
import Email from './components/LogIn/Email'
import PendingPayments from './components/PendingPayments/PendingPayments'
import AboutUs from './components/AboutUs/AboutUs'
function App(props) {
  console.log("app props",props);
  return (
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/otp" component={OTP} />
      <Route path="/email" component={Email} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/backoffice" component={BLogIn} />
      <Route path="/aboutus" component={AboutUs} />
      {props.user.user?<><Route path="/selectservice" component={SelectServices} />
      <Route path="/describeservice" component={DescribeService} />
      <Route path="/selecttimeservice" component={SelectTimeService} />
      <Route path="/bservices" component={BServices} />
      <Route path="/bjanitors" component={BJanitors} />
      <Route path="/bservicedetail" component={BServiceDetail} />
      <Route path="/bjanitordetail" component={BJanitorDetail} />
      <Route path="/pendingpayments" component={PendingPayments} />
      </>:null}
    </Switch>

  );
}

const mapStateToProps = ({EventUser})=>{
  return {
    user:EventUser
  }
}

export default connect(mapStateToProps)(App);
