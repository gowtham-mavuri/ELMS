import React from 'react';
import {

  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import DepartmentsBranch from '../DepartmentsBranch';
import EmployeesBranch from '../EmployeesBranch';
import RequestBranch from '../RequestsBranch';
import OldRequestBranch from '../OldRequestsBranch';
import EmployeeUpdate from '../EmployeeUpdate';
import EmployeeCreate from '../EmployeeCreate';
import EmployeeRequests from '../EmployeeRequests';

import '../sidebar.css'
import logo from '../logopic.png'
import AddDept from '../AddDept';

function SubadminDashboard(props) {
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
                <Link to={`${url}/AddEmployee`}>Add Employee</Link>
              </li>
              <li>
                <Link to={`${url}/empList`}>Manage Employee</Link>
              </li>
              <li>
                <Link to={`${url}/AddDept`}>Add Department</Link>
              </li>
              <li>
                <Link to={`${url}/departments`}>Manage Departments</Link>
              </li>            
              <li>
                <Link to={`${url}/requests`}>New Leave Requests</Link>
              </li>
              <li>
                <Link to={`${url}/oldrequests`}>Old  leave Requests</Link>
              </li>
              
              
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
      </nav>
      <Switch>
              <Route exact path={path} component={DepartmentsBranch} />
              <Route path={`${path}/departments`} component={DepartmentsBranch} />

              <Route path={`${path}/empList`} component={EmployeesBranch} />
 
              <Route path={`${path}/requests`} component={RequestBranch} />
              <Route path={`${path}/oldrequests`} component={OldRequestBranch} />

              <Route exact path={`${path}/emp/:emp_id`} component={EmployeeUpdate} />
              <Route exact path={`${path}/emp/reqs/:emp_id`} component={EmployeeRequests} />
              <Route path={`${path}/AddEmployee`} component={EmployeeCreate} />
              <Route path={`${path}/AddDept`} component={AddDept} />
      </Switch>
    </div>
    </div>
  )
}
 
export default SubadminDashboard;