import React,{useState,useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import '../styles/empUpdateForm.css'

const EmpSchema = yup.object().shape({
    deptCode : yup.string().required(),
    firstName : yup.string().required(),
    lastName : yup.string(),
    email : yup.string().email().required(),
    password :yup.string().min(5).required(),
    gender : yup.mixed().oneOf(["MALE","FEMALE","OTHER"]),
    phone : yup.number().required(),
    casualLeaves : yup.number().positive().integer().required(),
    sickLeaves :  yup.number().positive().integer().required(),
    unpaidLeaves : yup.number().integer().required()
  });

function EmployeeUpdate(props) {

    const { register, handleSubmit,reset, errors } = useForm({resolver:yupResolver( EmpSchema )});
    var emp_id = props.match.params.emp_id;
    const [depts,setDepts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [branchId,setBranchId] = useState('');
    const [deleted,setDeleted] = useState(false);
    const [curdept,setCurDept] = useState('');

    useEffect(()=>{
        axios.post('http://localhost:5000/branch/emp',{
          token:localStorage.getItem('token'),
          empId:emp_id
        }).then(res=>{
            var data=res.data.result[0];
            if(data){
                var date= data.dob;
                setCurDept(data.dept_code);
                date=moment(date).format('YYYY-MM-DD');
                reset({
                    deptCode : data.dept_code,
                    role : data.role,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    email : data.email,
                    password : data.password,
                    gender : data.gender,
                    DOB : date,
                    country : data.country,
                    city : data.city,
                    address : data.address,
                    phone : data.phone_number,
                    casualLeaves : data.casual_leaves,
                    sickLeaves : data.sick_leaves,
                    unpaidLeaves : data.unpaid_leaves
                })
                setBranchId(data.branch_id)
            }
            setLoading(false);
            }).catch(err=>{
              console.log(err);
              setLoading(false);
            })
            // eslint-disable-next-line
      },[])

      useEffect(()=>{
        axios.post('http://localhost:5000/branch/depts',{
            token:localStorage.getItem('token'),
            id:props.match.params.id
        }).then(res=>{
                setDepts(res.data.result);
        }).catch(err=>{
              console.log(err);
            })
            // eslint-disable-next-line
      },[])

    const onSubmit=data=>{
        setLoading(true);
        var { deptCode ,role ,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves} = data;
        axios.post('http://localhost:5000/branch/empUpdate',{
            token:localStorage.getItem('token'),
            id:props.match.params.id,
            empId:emp_id,
            deptCode,role,firstName,lastName,
            email,password,gender,DOB,country,city,
            address,phone,casualLeaves,sickLeaves,unpaidLeaves
        }).then(res=>{
            var data=res.data.result[0];
            if(data)
            {
                var date= data.dob;
                date=moment(date).format('YYYY-MM-DD');
                reset({
                    deptCode : data.dept_code,
                    role : data.role,
                    firstName : data.first_name,
                    lastName : data.last_name,
                    email : data.email,
                    password : data.password,
                    gender : data.gender,
                    DOB : date,
                    country : data.country,
                    city : data.city,
                    address : data.address,
                    phone : data.phone_number,
                    casualLeaves : data.casual_leaves,
                    sickLeaves : data.sick_leaves,
                    unpaidLeaves : data.unpaid_leaves
                })
                setBranchId(data.branch_id)
            }
            if(res.data.error)
               {}
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    const handleDelete=()=>{
        axios.post('http://localhost:5000/branch/empDelete',{
            token:localStorage.getItem('token'),
            empId:emp_id
        }).then(res=>{
            if(res.data.error)
               {}
            else
                setDeleted(true);
        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

    if(deleted)
        return <div>
            <h1>Employee is Deleted  :~(</h1>
        </div>
    if(loading)
        return <div>Loading</div>

    return (
        <div id="formbox"> 
        <h3>UPDATE EMPLOYEE DETAILS</h3> 
        <h5>Branch Id :  {branchId}</h5>
        <h5>Employee Id :  {emp_id}</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div id="row">
                    <div id="forminp">
                        <label >Choose a dept:</label>
                        <select  name="deptCode" ref={register} defaultValue={curdept}>
                          { depts.map((dept)=><option value={dept.code} id={dept.code}>{dept.name}</option>) }
                        </select>
                    </div>
                    <div id="forminp">
                        <label>Gender</label>
                        <select  required name="gender" ref={register}>
                            <option hidden disabled selected value> -- select gender -- </option>
                            <option value="MALE" id="MALE">Male</option>
                            <option value="FEMALE" id="FEMALE">Female</option>
                            <option value="OTHER" id="OTHER">Other</option>
                        </select>
                        {errors.gender && <p>{errors.gender.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Date of birth</label>
                        <input  required type="date" name="DOB" ref={register} />
                        {errors.DOB && <p>{errors.DOB.message}</p>}
                    </div>
                </div>
                <div id="row">
                    <div id="forminp">
                        <label>Role</label>
                        <input type="text" name="role" ref={register} />
                        {errors.role && <p>{errors.role.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>First Name</label>
                        <input type="text" name="firstName" ref={register} />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Last Name</label>
                        <input type="text" name="lastName" ref={register} />
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                    </div> 
                </div>
                <div id="row">
                    <div id="forminp">
                        <label>Email</label>
                        <input type="text" name="email" ref={register} />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Password</label>
                        <input type="text" name="password" ref={register} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Phone number</label>
                        <input type="text" name="phone" ref={register} />
                        {errors.phone && <p>{errors.phone.message}</p>}
                    </div>
                </div>
                <div id="row">
                    <div id="forminp">
                        <label>Country</label>
                        <input type="text" name="country" ref={register} />
                        {errors.country && <p>{errors.country.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>City</label>
                        <input type="text" name="city" ref={register} />
                        {errors.country && <p>{errors.city.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Address</label>
                        <input type="text" name="address" ref={register} />
                        {errors.address && <p>{errors.address.message}</p>}
                    </div>
                    
                </div>
                <div id="row">
                    <div id="forminp">
                        <label>Casual Leaves remaining</label>
                        <input type="number" name="casualLeaves" ref={register} />
                        {errors.casualLeaves && <p>{errors.casualLeaves.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Sick leaves remaining</label>
                        <input type="number" name="sickLeaves" ref={register} />
                        {errors.sickLeaves && <p>{errors.sickLeaves.message}</p>}
                    </div>
                    <div id="forminp">
                        <label>Unpaid leaves remaining</label>
                        <input type="number" name="unpaidLeaves" ref={register} />
                        {errors.unpaidLeaves && <p>{errors.unpaidLeaves.message}</p>}
                    </div>
                </div>
                <input id="submitbutton" type="submit" />
                <button id="submitbutton" onClick={handleDelete}>Delete</button>
            </form>
    </div>
    )
}
 
export default EmployeeUpdate;