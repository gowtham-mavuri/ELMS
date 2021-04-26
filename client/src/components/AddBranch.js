import React,{useState} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import "../styles/form.css"

const BranchSchema = yup.object().shape({
    id : yup.number().required(),
    id : yup.number().required().typeError("Enter a valid branch ID"),
    name : yup.string().required(),
    location : yup.string().required(),
    password :yup.string().min(5).required()
  });

function AddBranch(props) {
    const { register, handleSubmit, errors } = useForm({resolver:yupResolver( BranchSchema )});
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [added,setAdded] = useState(false);
    const [branch,setBranch]=useState('');

    const onSubmit=data=>{
        setLoading(true);
        var { id,name,location,password } = data;
        setBranch(name);    
        axios.post('http://localhost:5000/admin/branchAdd',{
            token:localStorage.getItem('token'),id,
            name,location,password
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
                    {error && <h3>ID has been assigned to another branch</h3>}
                </div>
                <h3>Add Branch</h3>
                <form class="branch"onSubmit={handleSubmit(onSubmit)}>
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
                        <div id="forminp">
                            <label>Location</label>
                             <input type="text" name="location" ref={register} /> 
                             {errors.location && <p>{errors.location.message}</p>}
                        </div>
                        <div id="forminp">
                            <label>Branch Manager Password</label>
                            <input type="text" name="password" ref={register} />
                            {errors.password && <p>{errors.password.message}</p>}   
                        </div>
                        <div id="forminp">
                        <input id="submitbutton"type="submit" />
                        </div>
                  
                </form>
        </div>
    )
}

export default AddBranch;