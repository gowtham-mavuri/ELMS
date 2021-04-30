import React,{useState} from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Branches from '../Branches';
import UpdateBranch from '../UpdateBranch';
import UpdateHolidays from '../UpdateHolidays';
import AddDepartment from '../AddDepartment';
import Departments from '../Departments';
import AddEmployee from '../AddEmployee';
import UpdateEmployee from '../UpdateEmployee';
import AddBranch from '../AddBranch';
import OldRequests from '../OldRequests';
import '../navbar.css'
import logo from '../logopic.png'
import Employees from '../Employees';
import Requests from '../Requests';
import EmployeeRequests from '../EmployeeRequests';
import AdminToday from '../AdminToday';






function AdminDashboard(props) {
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
        <h3 >Shri Chandra Bulk Cargo Services Pvt.Ltd</h3>
      </div>
    </div>
      <nav class="navbar navbar-expand-lg navbar-light" id="nav">
      <div class="container">
        
      <button class="navbar-toggler a" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span class="navbar-toggler-icon"></span>
      </button>
  
        
        <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent" >
          <ul class="navbar-nav" >
            <li class="nav-item dropdown" >
            <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            Branch
          </div>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown" >
                <li><Link to={`${url}/addBranch`} >Add Branch</Link></li>
                <li><Link to={`${url}/branches`}>Manage Branch</Link></li>
              </ul>
            </li>
        <li class="nav-item dropdown">
          <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            Department
          </div>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to={`${url}/addDept`}>Add Department</Link></li>
            <li><Link to={`${url}/Depts`}>Manage Department</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            Employee
          </div>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to={`${url}/addEmp`}>Add Employee</Link></li>
            <li><Link to={`${url}/Emps`}>Manage Employee</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            Requests
          </div>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><Link  to={`${url}/Today`}>Today</Link></li>
            <li><Link  to={`${url}/Reqs`}>New Requests</Link></li>
            <li><Link  to={`${url}/OldReqs`}>Old Requests</Link></li>
          </ul>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={`${url}/holidays`}>Add Holidays</Link>
        </li>
        <li class="nav-item" id="logout">
              <a class="nav-link" onClick={handleLogout}>Logout</a>
          </li>
          </ul>
          
          </div>
        </div>
     </nav>
    <div>
      <Switch>
              <Route exact path={path}>
                <Branches />
              </Route>
              <Route path={`${path}/branches`}>
                <Branches />
              </Route>
              <Route path={`${path}/addBranch`}>
                <AddBranch />
              </Route>
              <Route path={`${path}/addDept`}>
                <AddDepartment />
              </Route>
              <Route path={`${path}/Depts`}>
                <Departments />
              </Route>
              <Route path={`${path}/Emps`}>
                <Employees />
              </Route>
              <Route path={`${path}/addEmp`}>
                <AddEmployee />
              </Route>
              <Route path={`${path}/Today`}>
                <AdminToday />
              </Route>
              <Route path={`${path}/Reqs`}>
                <Requests />
              </Route>
              <Route path={`${path}/OldReqs`}>
                <OldRequests />
              </Route>
              <Route path={`${path}/updateEmp/:id`} component={UpdateEmployee} />
              <Route path={`${path}/emp/reqs/:emp_id`} component={EmployeeRequests} />
              <Route path={`${path}/update/:id`} component={UpdateBranch} />
              <Route path={`${path}/holidays`} component={UpdateHolidays} />
      </Switch>
    </div>
    </div>
    
    
  );
}

export default AdminDashboard;