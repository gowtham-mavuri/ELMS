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
      <h3 class="h33" >Profile</h3>
      { error &&
        <h3>Error occured </h3>
      }
    <div class="card mb-0">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
                  <div class="row">
                  <div class="col-md-6">
                    <div class="profile-into-left left">
                    <h3 class="user-name m-t-0 mb-0">{emp.first_name+" "+emp.last_name}</h3>
                      <div class="text-muted-p"><label>Role:&nbsp;&nbsp;</label>
                         <span class="text-area">{emp.role}</span></div>
                      <div class="text-muted-p"><label>Emp Id:&nbsp;&nbsp;</label> 
                        <span class="text-area">{emp.emp_id}</span></div>
                      <div class="text-muted-p"><label>Branch Code:&nbsp;&nbsp;</label>
                        <span class="text-area">{emp.branch_id}</span></div>
                      <div class="text-muted-p"><label>Dept Code:&nbsp;&nbsp;</label>
                          <span class="text-area">{emp.dept_code}</span></div>
                    </div>                  
                  </div> 
                      <div class="col-md-6">
                        <ul class="personal-info right-p">
                          <li> <div class="title"><label>Phone&nbsp;&nbsp;</label></div>
                                <div class="text">{emp.phone_number}</div>
                          </li>
                          <li> <div class="title"><label>Email&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.email}</div>                        
                          </li>
                          <li> <div class="title"><label>Gender&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.gender}</div>
                          </li>
                          <li><div class="title"><label>DOB&nbsp;&nbsp;</label></div>
                               <div class="text">{moment(emp.dob).format('YYYY-MM-DD')}</div>
                          </li>
                          <li> <div class="title"><label>Country&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.country}</div>
                          </li>
                          <li> <div class="title"><label>City&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.city}</div>
                          </li>
                          <li> <div class="title"><label>Address&nbsp;&nbsp;</label></div>
                               <div class="text">{emp.address}</div>
                          </li>
                        </ul>
                      </div>
                    </div>
              </div>
            </div>
          </div>
  </div>
  <div class="leaves-profile">
      <div class="leave-profile">
        <label class="leave-head">Casual Leaves Remaining</label>
        <label class="leave-data">{emp.casual_leaves}</label>
      </div>
      <div class="leave-profile">
        <label class="leave-head">Sick Leaves Remaining</label>
        <label class="leave-data">{emp.sick_leaves}</label>
      </div>
      <div class="leave-profile">
        <label class="leave-head">Unpaid Leaves Taken</label>
        <label class="leave-data">{emp.unpaid_leaves} </label>
      </div>
  </div>
 
</div>
  
    )

}

 
export default EmployeeProfile;
