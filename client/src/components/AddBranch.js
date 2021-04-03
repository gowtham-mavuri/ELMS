import React,{useState} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import '../styles/form.css'

const BranchSchema = yup.object().shape({
    id : yup.number().required(),
    name : yup.string().required(),
    location : yup.string().required(),
    adminName : yup.string().required(),
    adminPassword :yup.string().min(5).required(),
    adminEmail : yup.string().email().required()
  });

function AddBranch(props) {
    const { register, handleSubmit, errors } = useForm({resolver:yupResolver( BranchSchema )});
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [added,setAdded] = useState(false);
    const [branch,setBranch]=useState('');

    const onSubmit=data=>{
        setLoading(true);
        var { id,name,location,adminName,adminEmail,adminPassword } = data;
        setBranch(name);    
        axios.post('http://localhost:5000/admin/branchAdd',{
            token:localStorage.getItem('token'),id,
            name,location,adminName,adminEmail,adminPassword
        }).then(res=>{
            if(res.data.error)
                setError(true);
            else
                setAdded(true);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setError(true);
            setLoading(false);
        })
    }

    if(added)
        return <div>Added {branch} Branch Succesfully</div>
    if(loading)
        return <div>Loading</div>
    return (
        <div id="formbox">  
                <div>
                    {error && <h3>error occured</h3>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h2> ADD BRANCH</h2>
                    <div id="row">
                        <div id="forminp">
                            <label>Branch ID</label>
                            <input type="number" name="id" ref={register} />   
                            {errors.id && <p>{errors.id.message}</p>}  
                        </div>
                        <div id="forminp">
                            <label>Name</label>
                            <input type="text" name="name" ref={register} />
                            {errors.name && <p>{errors.name.message}</p>}     
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Location</label>
                             <input type="text" name="location" ref={register} /> 
                             {errors.location && <p>{errors.location.message}</p>}
                        </div>
                        <div id="forminp">
                            <label>Admin Name</label>
                            <input type="text" name="adminName" ref={register} />
                            {errors.adminName && <p>{errors.adminName.message}</p>}    
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Admin Email</label>
                            <input type="email" name="adminEmail" ref={register} />
                            {errors.adminEmail && <p>{errors.adminEmail.message}</p>} 
                        </div>
                        <div id="forminp">
                            <label>Admin Password</label>
                            <input type="text" name="adminPassword" ref={register} />
                            {errors.adminPassword && <p>{errors.adminPassword.message}</p>}   
                        </div>
                    </div>
                    <input type="submit" />
                </form>
        </div>
    )
}

export default AddBranch;