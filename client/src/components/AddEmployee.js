import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import '../styles/empUpdateForm.css'

const EmpSchema = yup.object().shape({
    empId: yup.string().required(),
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

function AddEmployee(props) {

    const { register, handleSubmit, errors } = useForm({resolver:yupResolver( EmpSchema )});
    const [depts,setDepts] = useState([]);
    const [branchId,setBranchId] = useState('');
    const [added,setAdded] = useState(false);
    const [branches,setBranches] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/admin/fetchBranches').then(res=>{
        console.log(res.data.result)
            setBranches(res.data.result);
        }).catch(err=>{
            console.log(err);
        })
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        axios.post('http://localhost:5000/admin/dept',{
            token:localStorage.getItem('token'),
            id:branchId
        }).then(res=>{
            setDepts(res.data.result);
        }).catch(err=>{
            console.log(err);
          })
          // eslint-disable-next-line
    },[branchId])

    const onSubmit=(data)=>{
        var { id,empId , deptCode ,role ,firstName,lastName,email,password,gender,DOB,country,city,address,phone,casualLeaves,sickLeaves,unpaidLeaves} = data;
        axios.post('http://localhost:5000/branch/empCreate',{
            token:localStorage.getItem('token'),
            id,
            empId,
            deptCode,role,firstName,lastName,
            email,password,gender,DOB,country,city,
            address,phone,casualLeaves,sickLeaves,unpaidLeaves
        }).then(res=>{
            if(res.data.error)
            {}   //setError(true);
            else 
                setAdded(true);
        }).catch(err=>{
            console.log(err);
        })
    }
    
    if(added)
        return <div>Added Successfully</div>
    return (
        <div id="formbox"> 
        <h3>ADD EMPLOYEE</h3> 
            <form class="emp" onSubmit={handleSubmit(onSubmit)}>
                    <div id="forminp">
                            <label>Branch</label>
                            <select name="id" onChange={e=>setBranchId(e.target.value)} ref={register} >   
                                <option disabled hidden selected value="">--select a branch--</option>
                               { branches&&branches.map(b=><option id={b.branch_id} value={b.branch_id}>{b.name}</option>) }
                            </select>
                            {errors.id && <p>{errors.id.message}</p>}  
                    </div>
                    <div id="forminp">
                        <label>Employee ID</label>
                        <input type="text" name="empId" placeholder="Can't be changed later" ref={register} />
                        {errors.empId && <p>{errors.empId.message}</p>}
                    </div>
                    <div id="forminp">
                        <label >Choose a dept:</label>
                        <select  name="deptCode" ref={register} >
                          <option hidden disabled selected value> -- select an option -- </option>
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
                    <div id="forminp">
                        <input id="submitbutton" type="submit" />
                    </div>
                
            </form>
    </div>
    )

}
 
export default AddEmployee;