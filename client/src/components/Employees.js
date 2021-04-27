import React, { useEffect, useState } from 'react';
import axios from 'axios';

import EmployeeContainer2 from './EmployeeContainer2';
import "../styles/table.css"

function Employees() {
  const [loading,setLoading] = useState(true);
  const [empList,setEmpList] = useState([]);
  const [error,setError] = useState(false);
  const [searchBranch,setSearchBranch] = useState("ALL");
  const [searchTerm,setSearchTerm] = useState("");
  const [branches,setBranches] = useState([]);
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5000/admin/fetchBranches').then(res=>{
      console.log(res.data.result)
        setBranches(res.data.result);
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
      })
      // eslint-disable-next-line
    },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/emps',{
        token:localStorage.getItem('token')
    }).then(res=>{
            console.log(res.data.result)
            setEmpList(res.data.result);
            setLoading(false);
        }).catch(err=>{
          setError(true);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const dynamicSearch = () => {
    var emps;
    if(searchBranch==="ALL")
        emps = empList;
    else
        emps = empList.filter(emp => emp.branch_id==searchBranch)
    if(searchTerm==="")
      return emps;
    console.log(emps)
    return emps.filter(emp =>(emp.first_name+emp.last_name).toLowerCase().includes(searchTerm.toLowerCase()))
  }


  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div id="bb">
      <div>
        {error&&<p>Error Occured</p>}
      </div>
     <div class="employees-list-top">
     <div class="dropdown-table searchbar">
            <select onChange={(e)=>setSearchBranch(e.target.value)} >
              <option selected value="ALL" id="ALL">All Branches</option>
              { branches.map((branch)=><option value={branch.branch_id} id={branch.branch_id}>{branch.name}</option>) }
            </select>
      </div>
      <div class="searchbar">
        <input  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for an employee name"/>
      </div>
     </div>
     <div class ="emp-table table-responsive">
        <table class="table">
        <tbody>
          <tr>
          <th>BranchId</th>
          <th>EmpID</th>
          <th>Dept Code</th>
          <th>Role</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Updates</th>
          <th>Requests</th>           
          </tr>
          </tbody>
          <EmployeeContainer2 emps={dynamicSearch() } />
          </table>
        </div>
    </div>
  );
  
}
 
export default Employees;