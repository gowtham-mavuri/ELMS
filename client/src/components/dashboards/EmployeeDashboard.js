import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


import EmployeeProfile from '../EmployeeProfile';
import ApplyLeave from '../ApplyLeave';
import RequestHistory from '../RequestHistory';
import '../sidebar.css'
import logo from '../logopic.png'
function EmployeeDashboard(props) {
  let { path, url } = useRouteMatch();
 
  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 
  return (
    <div>
    <div id="header">
        <img id="logo" src={logo} alt="Logo" />
        <h3 id="name">SHRI CHANDRA BULK CARGO SERVICES PVT.LTD</h3>
    </div>
    <div id="total">
      <nav id="sidebar">
            <ul className="list-unstyled components">
            <li>
              <Link to={`${url}/profile`}>Profile</Link>
            </li>
            <li>
              <Link to={`${url}/leave`}>Apply Leave</Link>
            </li>
            <li>
              <Link to={`${url}/requests`}>Leave History</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
            </ul>
      </nav>
      <Switch>
              <Route exact path={path}>
                <EmployeeProfile />
              </Route>
              <Route path={`${path}/profile`}>
                <EmployeeProfile />
              </Route>
              <Route path={`${path}/leave`}>
                <ApplyLeave />
              </Route>
              <Route path={`${path}/requests`}>
                <RequestHistory />
              </Route>
      </Switch>
    </div>
    </div>
  );
}
 
export default EmployeeDashboard;