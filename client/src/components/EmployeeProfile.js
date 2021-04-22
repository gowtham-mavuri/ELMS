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
                    <h3 class="user-name m-t-0 mb-0">{emp.first_name+" "+emp.last_name}</h3>
                      <div class="text-muted"><label>Role:&nbsp;&nbsp;</label>
                         <span class="text-area">{emp.role}</span></div>
                      <div class="text-muted"><label>Emp Id:&nbsp;&nbsp;</label> 
                        <span class="text-area">{emp.emp_id}</span></div>
                      <div class="text-muted"><label>Branch Code:&nbsp;&nbsp;</label>
                        <span class="text-area">{emp.branch_id}</span></div>
                      <div class="text-muted"><label>Dept Code:&nbsp;&nbsp;</label>
                          <span class="text-area">{emp.dept_code}</span></div>
                    </div>                  
                  </div> 
                      <div class="col-md-7">
                        <ul class="personal-info">
                          <li> <div class="title"><label>Phone:&nbsp;&nbsp;</label></div>
                                <div class="text"><a href>{emp.phone_number}</a></div>
                          </li>
                          <li> <div class="title"><label>Email:&nbsp;&nbsp;</label></div>
                               <div class="text"><a href>{emp.email}</a></div>                        
                          </li>
                          <li> <div class="title"><label>Gender:&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.gender}</div>
                          </li>
                          <li><div class="title"><label>DOB:&nbsp;&nbsp;</label></div>
                               <div class="text">{moment(emp.dob).format('YYYY-MM-DD')}</div>
                          </li>
                          <li> <div class="title"><label>Country:&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.country}</div>
                          </li>
                          <li> <div class="title"><label>City:&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.city}</div>
                          </li>
                          <li> <div class="title"><label>Address:&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.address}</div>
                          </li>
                        </ul>
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
</div>
  
    )

}

 
export default EmployeeProfile;