import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../styles/pagination.css';
import '../styles/oldReq.css'

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
    <div id="oldRequests">
      <div>
        Emp ID : {emp.emp_id} <br/>
        Name : {emp.first_name + emp.last_name} <br/>
        Branch : {emp.name} <br/>
        Department : {emp.short_name} <br/>
        Sick Leaves Remaining : {emp.sick_leaves} <br/>
        Casual Leaves Remaining : {emp.casual_leaves} <br/>
        Unpaid Leaves Taken : {emp.unpaid_leaves} <br/>
      </div>
      <div>
      {data&&data.map((req)=><div>   
     <div class="table">
       <div id="eeee">
                  <table>   
                    <tbody>
                    <tr>
                       <th>ReqID::&nbsp;&nbsp;</th>
                       <th>From:&nbsp;&nbsp;</th>
                       <th>To:&nbsp;&nbsp;</th>
                       <th>Type:&nbsp;&nbsp;</th>
                       <th>Days:&nbsp;&nbsp;</th>
                       <th>Desc:&nbsp;&nbsp;</th>
                       <th>Status:&nbsp;&nbsp;</th>
                       <th>Admin Remarks:&nbsp;&nbsp;</th>
                       <th>Manager Remarks:&nbsp;&nbsp;</th>


                    </tr> 
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
                    </tbody>  
                </table>

                  </div>
                  </div>
</div>)}
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