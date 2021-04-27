import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../styles/pagination.css';
import "../styles/table.css"

function EmployeeRequests(props) {
  var empId=props.match.params.emp_id;
  const [loading,setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0)
  const [emp,setEmp] = useState("");

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/emp',{
        token:localStorage.getItem('token'),
        empId
    }).then(res=>{
            var d=res.data.result;
            setEmp(d[0]);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
         
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/empReqs',{
        token:localStorage.getItem('token'),
        empId
    }).then(res=>{
            var d=res.data.result;
            setReqs(res.data.result);
            const slice = d.slice(offset, offset + perPage)
            setData([...slice])
            setPageCount(Math.ceil(d.length / perPage))  
            setLoading(false);
        }).catch(err=>{
          console.log(err);
         
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const getData = () => {
    const slice = reqs.slice(offset, offset + perPage)
    setData([...slice])
}

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

const handlePageClick = (e) => {
  const selectedPage = e.selected;
  setOffset(selectedPage + 1)
};


  if(loading)
  {
    return(<div>Loading</div>)
  }
  
  return (
    <div id="bb">
      <div class="emp-req-details">
        <div class="emp-req-details-left">
        <li><div class="title-emp"><label>EmpID</label></div>
            <div class="text-emp">{emp.emp_id}</div>
        </li>
        <li><div class="title-emp"><label>Name</label></div>
            <div class="text-emp">{emp.first_name + emp.last_name}</div>
        </li>
        <li><div class="title-emp"><label>Branch</label></div>
            <div class="text-emp">{emp.name}</div>
        </li>
        <li><div class="title-emp"><label>Department</label></div>
            <div class="text-emp">{emp.short_name}</div>
        </li>
        </div>
        <div class="emp-req-details-right">
        <li><div class="title-emp"><label>Sick Leaves Remaining</label></div>
            <div class="text-emp">{emp.sick_leaves}</div>
        </li>
        <li><div class="title-emp"><label>Casual Leaves Remaining</label></div>
            <div class="text-emp">{emp.casual_leaves}</div>
        </li>
        <li><div class="title-emp"><label> Unpaid Leaves Taken</label></div>
            <div class="text-emp">{emp.unpaid_leaves}</div>
        </li>
        </div>
        
      </div>
     <div class="emp-table table-responsive">
                  <table class="table">   
                    <tbody>
                    <tr>
                       <th>ReqID</th>
                       <th>From</th>
                       <th>To</th>
                       <th>Type</th>
                       <th>Days</th>
                       <th>Desc</th>
                       <th>Status</th>
                       <th>Admin Remarks</th>
                       <th>Manager Remarks</th>
                    </tr> 
                    {data&&data.map((req)=> 
                    <tr>
                        <td>{req.leave_id} </td>
                        <td>{moment(req.from_date).format('MM Do YYYY')} </td>
                        <td>{moment(req.to_date).format('MM Do YYYY')} </td>
                        <td> {req.type}</td>
                        <td> {req.days}</td>
                         <td>{req.description} </td>
                         <td> {req.status}</td>
                         <td> {req.admin_remarks}</td>
                         <td>{req.branch_manager_remarks}</td>
                      </tr>
                      )}
                    </tbody>  
                </table>
                  </div>
      <div>
            <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
      </div>
    </div>
    
  );
  
}
 
export default EmployeeRequests;