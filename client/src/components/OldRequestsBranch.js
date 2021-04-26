import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';

function OldRequestsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0)
  const [reqs,setReqs] = useState([]);
  const id=props.match.params.id;

  useEffect(() => {
    axios.post('http://localhost:5000/branch/reqs',{
      token:localStorage.getItem('token'),
      id
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
  }, [])

const getData = () => {
    const slice = reqs.slice(offset*perPage, offset*perPage + perPage)
    setData([...slice])
}



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage )
};

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

  if(loading)
  {
    return(<div>Loading</div>)
  }
  

  
  
  return (
    <div id="bb">
      <div class= "branch-table">
      <table> 
                <tbody>  
                    <tr>
                       <th>ReqID</th>
                       <th>EmpID</th>
                       <th>Dept Code</th>
                       <th>Name</th>
                        <th>From</th>
                         <th>To</th>
                           <th>Type</th>
                           <th>Days</th>
                           <th>Desc</th>
                           <th>Status</th>
                           <th>Admin Remarks</th>
                          <th> Manager Remarks</th>
                      </tr> 
                      {data&&data.map((req)=>
                          //  {console.log(req)}
                    <tr>
                        <td>{req.leave_id} </td>
                        <td>{req.emp_id} </td>
                        <td> {req.dept_code}</td>
                        <td>{req.first_name+' '+req.last_name} </td>
                        <td>{moment(req.from_date).format('MM Do YYYY')} </td>
                        <td> {moment(req.to_date).format('MM Do YYYY')}</td>
                         <td>{req.type} </td>
                          <td> {req.days}</td>
                            <td>{req.description} </td>
                               <td>{req.status} </td>
                              <td> {req.admin_remarks}</td> 
                              <td>  {req.branch_manager_remarks}</td> 
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
 
 
export default OldRequestsBranch;