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
      <div id="profile">
          <div id="p1"><label>Branch Code:&nbsp;&nbsp;</label>{emp.branch_id}</div>
          <div id="p1"><label>Dept Code:&nbsp;&nbsp;</label>{emp.dept_code}</div>
          <div id="p1"><label>Emp Id:&nbsp;&nbsp;</label>{emp.emp_id}</div>
          <div id="p1"><label>Role:&nbsp;&nbsp;</label>{emp.role}</div>
          <div id="p1"><label>Name:&nbsp;&nbsp;</label>{emp.first_name+" "+emp.last_name}</div>
          <div id="p1"><label>Email:&nbsp;&nbsp;</label>{emp.email}</div>
          <div id="p1"><label>Gender:&nbsp;&nbsp;</label>{emp.gender}</div>
          <div id="p1"><label>Phone:&nbsp;&nbsp;</label>{emp.phone_number}</div>
          <div id="p1"><label>DOB:&nbsp;&nbsp;</label>{moment(emp.dob).format('YYYY-MM-DD')}</div>
          <div id="p1"><label>Country:&nbsp;&nbsp;</label>{emp.country}</div>
          <div id="p1"><label>City:&nbsp;&nbsp;</label>{emp.city}</div>
          <div id="p1"><label>Address:&nbsp;&nbsp;</label>{emp.address}</div>
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