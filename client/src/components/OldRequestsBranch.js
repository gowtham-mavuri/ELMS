import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';
import '../styles/oldReq.css'
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
    <div id="oldRequests">
      <div id="reqs">
      {data&&data.map((req)=><div id="req">
        {console.log(req)}
      <ul>
        <div id="directdiv">
            <label id="line2"><label>ReqID:&nbsp;&nbsp;</label>{req.leave_id}</label>
            <label id="line2"><label>EmpID:&nbsp;&nbsp;</label>{req.emp_id}</label>
            <label id="line2"><label>Dept Code:&nbsp;&nbsp;</label>{req.dept_code}</label>
        </div>
        <div id="line3div">
            <label id="line3"><label>Name:&nbsp;&nbsp;</label>{req.first_name+' '+req.last_name}</label>
        </div>
        <div id="directdiv">
            <label id="line4"><label>From:&nbsp;&nbsp;</label>{moment(req.from_date).format('MM Do YYYY')}</label>
            <label id="line4"><label>To:&nbsp;&nbsp;</label>{moment(req.to_date).format('MM Do YYYY')}</label>
        </div>
        <div id="directdiv">
            <label id="line51"><label>Type:&nbsp;&nbsp;</label>{req.type}</label>
            <label id="line52"><label>Days:&nbsp;&nbsp;</label>{req.days}</label>
        </div>    
        <div id="line3div">
             <label id="line3"><label>Desc:&nbsp;&nbsp;</label>{req.description}</label>
        </div>
        <div  id="directdiv">
        <label id="line2"><label>Status:&nbsp;&nbsp;</label>{req.status}</label>
                                
        </div>
        <div id="line3div">
        <label id="line2"><label>Admin Remarks:&nbsp;&nbsp;</label>{req.admin_remarks}</label>
        </div>     
        <div id="line3div">
        <label id="line2"><label>Manager Remarks:&nbsp;&nbsp;</label>{req.branch_manager_remarks}</label>
        </div>                        
      </ul>
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
 
 
export default OldRequestsBranch;