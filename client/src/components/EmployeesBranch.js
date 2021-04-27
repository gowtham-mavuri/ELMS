import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeContainer from './EmployeeContainer';
import "../styles/table.css"

function EmployessBranch(props) {
  const [loading,setLoading] = useState(true);
  const [emps,setEmps] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const branch_id= props.match.params.id;
  useEffect(()=>{
    axios.post('http://localhost:5000/branch/emps',{
      token:localStorage.getItem('token'),
      id:props.match.params.id
    }).then(res=>{
            setEmps(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const dynamicSearch = () => {
    if(searchTerm==="")
      return emps;
    return emps.filter(emp =>(emp.first_name+emp.last_name).toLowerCase().includes(searchTerm.toLowerCase()))
  }

  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div id="bb">
      <div class="searchbar">
        <input  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for an employee name"/>
      </div>
      <div class ="emp-table table-responsive">
      <table class="table">
          <tbody>
            <tr>
            <th>EmpId</th>
            <th>DeptId</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Contact No</th>
            <div>
            <th>Update</th>
            <th>Delete</th>
            </div>
            </tr>
            <EmployeeContainer emps={dynamicSearch() } branch_id={branch_id} />
          </tbody>
        </table>
      </div>
    </div>
  );

}
 
export default EmployessBranch;