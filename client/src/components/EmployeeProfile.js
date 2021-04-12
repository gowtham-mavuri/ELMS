import React,{useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import '../styles/profile.css'
function EmployeeProfile() {
    const [emp,setEmp] = useState({});
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    useEffect(()=>{
       axios.post('http://localhost:5000/emp/profile',{
        token:localStorage.getItem('token')
       }).then(res=>{
          if(res.data.error)
            setError(res.data.message);
          else
            setEmp(res.data.result[0]);
          setLoading(false);
       }).catch(err=>{
          console.log(err);
          setLoading(false);
       })
    },[])


    if(loading)
    return <div>Loading..</div>


    return (
      <div id="outdiv">
      <h3>Employee profile</h3>
      { error &&
        <h3>Error occured </h3>
      }
    <div class="card mb-0">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <div class="profile-view">
              <div class="profile-basic">
                  <div class="row">
                  <div class="col-md-5">
                    <div class="profile-into-left">
    
                      <div class="staff-id"><label>Branch Code:&nbsp;&nbsp;</label>{emp.branch_id}</div>
                      <div class="staff-id"><label>Dept Code:&nbsp;&nbsp;</label>{emp.dept_code}</div>
                      <div class="staff-id"><label>Emp Id:&nbsp;&nbsp;</label>{emp.emp_id}</div>
                      <h6 class="text-muted"><label>Role:&nbsp;&nbsp;</label>{emp.role}</h6>
                      <h3 class="user-name m-t-0 mb-0"><label>Name:&nbsp;&nbsp;</label>{emp.first_name+" "+emp.last_name}</h3>
                      <div class="col-md-7">
                        <ul class="personal-info">
                          <li> <div class="title"><label>Email:&nbsp;&nbsp;</label>{emp.email}</div></li>
                          <li> <div class="title"><label>Gender:&nbsp;&nbsp;</label>{emp.gender}</div></li>
                          <li> <div class="title"><label>Phone:&nbsp;&nbsp;</label>{emp.phone_number}</div></li>
                          <li><div class="title"><label>DOB:&nbsp;&nbsp;</label>{moment(emp.dob).format('YYYY-MM-DD')}</div></li>
                          <li> <div class="title"><label>Country:&nbsp;&nbsp;</label>{emp.country}</div></li>
                          <li> <div class="title"><label>City:&nbsp;&nbsp;</label>{emp.city}</div></li>
                          <li> <div class="title"><label>Address:&nbsp;&nbsp;</label>{emp.address}</div></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="leaves">
          <div><label id="p2">Casual Leaves Remaining</label><label id="numl">{emp.casual_leaves}</label></div>
      </div>
      <div id="leaves">
          <div><label id="p2">Sick Leaves Remaining</label><label id="numl">{emp.sick_leaves}</label></div>
      </div>
      <div id="leaves">
          <div><label id="p2">Unpaid Leaves Taken</label><label id="numl">{emp.unpaid_leaves} </label></div>
      </div>
  </div>
    )

}

 
export default EmployeeProfile;