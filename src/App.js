import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Comp404 from "./components/Comp404"
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/LogIn/SignUp';
import SelectServices from './components/Services/SelectServices';
import DescribeService from './components/Services/DescribeService'
import SelectTimeService from './components/Services/SelectTimeService';
import BackOffice from './components/Services/BackOffice'
import {connect} from 'react-redux'
function App(props) {
  console.log("app props",props);
  return (
    <Switch>
      <Route exact path="/" component={SignUp} />
      <Route path="/login" component={LogIn} />
      {props.user.user?<><Route path="/selectservice" component={SelectServices} />
      <Route path="/describeservice" component={DescribeService} />
      <Route path="/selecttimeservice" component={SelectTimeService} />
      </>:null}
      <Route path="/backoffice" component={BackOffice} />
    </Switch>

  );
}

const mapStateToProps = ({EventUser})=>{
  return {
    user:EventUser
  }
}

export default connect(mapStateToProps)(App);
