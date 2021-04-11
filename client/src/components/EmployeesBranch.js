import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeContainer from './EmployeeContainer';

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
    <div>
      <div>
        <h3>Search For An Employee</h3>
        <input  type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for an employee name"/>
      </div>
      <div>
          <EmployeeContainer emps={dynamicSearch() } branch_id={branch_id} />
      </div>
    </div>
  );

}
 
export default EmployessBranch;