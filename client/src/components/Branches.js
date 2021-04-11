import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BranchContainer from './BranchContainer';
import '../styles/branchTable.css'
import ChartDoughnut from './ChartDoughnut';

function Branches() {
  const [loading,setLoading] = useState(true);
  const [branchList,setBranchList] = useState([]);
  const [error,setError] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");
  const [data,setData] = useState({});
  var labels=[]
  var dataOfEmp=[]
  var colors=[]

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/branches',{
        token:localStorage.getItem('token')
    }).then(res=>{
            setBranchList(res.data.result);
            res.data.result.map(branch=>{
              labels.push(branch.name);
              dataOfEmp.push(branch.emps);
              colors.push(getRandomRgb());
            })
            setData({
              dataOfEmp,
              labels,
              colors
            })
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setError(true);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }




  const dynamicSearch = () => {
    if(searchTerm==="")
      return branchList;
    return branchList.filter(branch =>(branch.name).toLowerCase().includes(searchTerm.toLowerCase()))
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
      <div id="b">
      <div>
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for branch"/>
      </div>
      <table>
        <div>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Update</th>
            <th>Manage</th>
            <th>Delete</th>
          </thead>
        </div>
          <BranchContainer branchList={dynamicSearch() } />
        </table>
      </div>
      <div>
        <ChartDoughnut data={data}/>
      </div>
    </div>
  );
  
}
 
export default Branches;