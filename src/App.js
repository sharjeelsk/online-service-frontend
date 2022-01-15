import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Home from "./components/Home"
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/LogIn/SignUp';
import SelectServices from './components/Services/SelectServices';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={SelectServices} />
    </Switch>
  );
}

export default App;
