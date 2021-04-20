import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentContainer from './DepartmentContainer';

import '../styles/table.css'

function Departments() {
  const [loading,setLoading] = useState(true);
  const [deptList,setDeptList] = useState([]);
  const [error,setError] = useState(false);
  const [searchBranch,setSearchBranch] = useState("ALL");

  const [branches,setBranches] = useState([]);
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5000/admin/fetchBranches').then(res=>{
        setBranches(res.data.result);
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
      })
      // eslint-disable-next-line
    },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/depts',{
        token:localStorage.getItem('token')
    }).then(res=>{
        console.log(res.data.result)
            setDeptList(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setError(true);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const dynamicSearch = () => {
      console.log(deptList)
    if(searchBranch==="ALL")
      return deptList;
    return deptList.filter(dept =>dept.branch_id==searchBranch)
  }


  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div>
      <div>
        {error&&<p>Error Occured</p>}
      </div>
      <div>
      <div>
            <select onChange={(e)=>setSearchBranch(e.target.value)} >
              <option selected value="ALL" id="ALL"> ALL BRANCHES </option>
              { branches.map((branch)=><option value={branch.branch_id} id={branch.branch_id}>{branch.name}</option>) }
            </select>
      </div>
      <div id="history">
      <div id="table">
        <div id="e">
        <table>
        <tbody>
          <tr>
            <th>Branch ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Short Name</th>
          </tr>
        <tr>
        <DepartmentContainer deptList={dynamicSearch() } />
        </tr>
        </tbody>
        </table>
        </div>
      
      </div>
      
      </div>
    </div>
      </div>
      
  );
  
}
 
export default Departments;