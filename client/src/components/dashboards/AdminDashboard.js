import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Branches from '../Branches';
import AddBranch from '../AddBranch';
import UpdateBranch from '../UpdateBranch';
import BranchComponent from './BranchComponent';
import UpdateHolidays from '../UpdateHolidays';


import '../sidebar.css'
import '../nav.css'
import logo from '../logopic.png'

function AdminDashboard(props) {
  let { path, url } = useRouteMatch();
 
  // handle click event of logout button
  const handleLogout = () => {   
    localStorage.setItem('token','');   
    props.history.push('/');
  }
 
  return (
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