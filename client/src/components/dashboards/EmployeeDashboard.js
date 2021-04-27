import React,{ useState,useEffect } from 'react';
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
  const [close,setClose] = useState(false);

  const funwidth = () => {
    if(close)
      return { width:"50px" }
    return {}
  }

  const fundisplay = () => {
    if(close)
      return { display:"none" }
    return {}
  }

  const handleClick = () => {
    setClose(!close);
  }

  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 
  return (
    <div id="side">
    <div class="header-admin">
      <div class="header-left-admin">
      <Link to={`${url}/profile`}><a href="#index" class="logo">
        <img id="logo" src={logo} alt="Logo" height="85"/>
        </a>
        </Link>
      </div>
      <div class="page-title-box-admin">
      <h3 >Shri Chandra Bulk Cargo Services Pvt.Ltd</h3>
    </div>
    </div>
   
    <div class="sidebar" id="sidebar" style={funwidth()}>
        <div class="sidebar-inner slimscroll">
          <a id="toggle_btn" href="javascript:void(0)" onClick={handleClick}>
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
         <div id="sidebar-menu" class="sidebar-menu" style={fundisplay()}>
              <ul>
                <li>
                  <Link to={`${url}/profile`}>Profile</Link>
                </li>
                <li>
                    <Link to={`${url}/leave`}>Apply Leave</Link>
                </li>
                <li>
                    <Link to={`${url}/requests`}>Leave History</Link>
                </li>
                <li class="sub-logout">
                    <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
          </div>
        </div>
    </div>
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
    
  );
}
 
export default EmployeeDashboard;
