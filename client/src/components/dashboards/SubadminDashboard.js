import React,{useState} from 'react';
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

import '../navbar.css'
import logo from '../logopic.png'
import AddDept from '../AddDept';
import SubadminToday from '../SubadminToday';

function SubadminDashboard(props) {
  let { path, url } = useRouteMatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 

  return (
    <div>
      <div class="header-admin">
        <div class="header-left-admin">
            <Link to={`${url}/profile`}><a href="#index" class="logo-admin">
              <img id="logo" src={logo} alt="Logo" height="85"/>
              </a>
            </Link>
        </div>
        <div class="page-title-box-admin">
          <h3>Shri Chandra Bulk Cargo Services Pvt.Ltd</h3>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light " id="nav">
        <div class="container">
          <button class="navbar-toggler a" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent" >
            <ul class="navbar-nav ms-auto" >
            <li class="nav-item dropdown">
            <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              Department
            </div>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li> <Link to={`${url}/AddDept`}>Add Department</Link></li>
              <li><Link to={`${url}/departments`}>Manage Department</Link></li>
            </ul>
            </li>
              <li class="nav-item dropdown" >
                <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" 
                          data-toggle="dropdown" aria-expanded="false">
                  Employee
                </div>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown" >
                  <li><Link to={`${url}/AddEmployee`}>Add Employee</Link></li>
                  <li><Link to={`${url}/empList`}>Manage Employee</Link></li>
                </ul>
              </li>
             
                <li class="nav-item dropdown">
              <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                Requests
              </div>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link to={`${url}/today`}>Employess on leave</Link></li>
                <li><Link to={`${url}/requests`}>New Leave Requests</Link></li>
                <li><Link to={`${url}/oldrequests`}>Old leave Requests</Link></li>
              </ul>
            </li>
            <li class="nav-item sub-logout">
            <a class="nav-link "onClick={handleLogout}>Logout</a>
              </li>
          </ul>
          </div>
        </div>
      </nav>
    <div>
      <Switch>
              <Route exact path={path} component={DepartmentsBranch} />
              <Route path={`${path}/departments`} component={DepartmentsBranch} />

              <Route path={`${path}/empList`} component={EmployeesBranch} />
              <Route path={`${path}/today`} component={SubadminToday} />
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