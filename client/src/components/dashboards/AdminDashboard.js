import React from 'react';
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
import '../sidebar copy.css'
import '../nav copy.css'
import logo from '../logopic.png'
import Employees from '../Employees';
import Requests from '../Requests';
import EmployeeRequests from '../EmployeeRequests';






function AdminDashboard(props) {
  let { path, url } = useRouteMatch();
 
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
      <nav class="navbar navbar-expand-lg navbar-light " id="nav">
      
      <div class="container">
      <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent" >
          <ul class="navbar-nav" >
            <li class="nav-item dropdown" >
              <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" 
                        data-bs-toggle="dropdown" aria-expanded="false">
                Branch
              </div>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown" >
                <li><Link to={`${url}/addBranch`} >Add Branch</Link></li>
                <li><Link to={`${url}/branches`}>Manage Branch</Link></li>
              </ul>
            </li>
        <li class="nav-item dropdown">
          <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Department
          </div>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to={`${url}/addDept`}>Add Department</Link></li>
            <li><Link to={`${url}/Depts`}>Manage Department</Link></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <div class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Employee
          </div>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to={`${url}/addEmp`}>Add Employee</Link></li>
            <li><Link to={`${url}/Emps`}>Employee List</Link></li>
          </ul>
        </li>
        <li class="nav-item">
        <Link class="nav-link" to={`${url}/Reqs`}>Request List</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link" to={`${url}/OldReqs`}>Old Request List</Link>
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
/*
<div>
    <div id="header">
        <img id="#logo" src={logo} alt="Logo" />
        <h3 id="name">SHRI CHANDRA BULK CARGO SERVICES PVT.LTD</h3>
    </div>
    <div id="topbar">
        <ul >
          <li >
            <Link to={`${url}/branches`}>Branches</Link>
          </li>
          <li>
            <Link to={`${url}/add`}>Add Branch</Link>
          </li>
          <li>
            <Link to={`${url}/holidays`}>Add Holidays</Link>
          </li>
          <li>
                <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
    </div>
    <div>
      <Switch>
              <Route exact path={path}>
                <Branches />
              </Route>
              <Route path={`${path}/branches`}>
                <Branches />
              </Route>
              <Route path={`${path}/add`}>
                <AddBranch />
              </Route>
              <Route path={`${path}/update/:id`} component={UpdateBranch} />
              <Route path={`${path}/branch/:id`} component={BranchComponent} />
              <Route path={`${path}/holidays`} component={UpdateHolidays} />
      </Switch>
    </div>
    </div>
    <!--<div class="header-left">
						<img src={logo} alt="Logo"></img>
        </div>-->
    

        <ul class="nav user-menu">
         <li class="nav-item dropdown">
						<a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
							<i class="fa fa-comment-o"></i> <span class="badge badge-pill">8</span>
						</a>
						<div class="dropdown-menu notifications">
							<div class="topnav-dropdown-header">
								<span class="notification-title">Messages</span>
								<a href="javascript:void(0)" class="clear-noti"> Clear All </a>
						  </div>
							<div class="noti-content">
								<ul class="notification-list">
									<li class="notification-message">
										<a href="https://smarthr.dreamguystech.com/blue/chat.html">
											<div class="list-item">
												<div class="list-left">
													<span class="avatar">
														<img alt="" src="https://smarthr.dreamguystech.com/blue/assets/img/profiles/avatar-09.jpg"></img>
													</span>
												</div>
												<div class="list-body">
													<span class="message-author">Richard Miles </span>
													<span class="message-time">12:28 AM</span>
													<div class="clearfix"></div>
													<span class="message-content">Lorem ipsum dolor sit amet, consectetur adipiscing</span>
												</div>
											</div>
										</a>
									</li>
                </ul>
              </div>
              </div>
            </li>
        </ul>
    */