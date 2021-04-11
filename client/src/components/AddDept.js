import React,{useState , useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import '../styles/form.css'

const DeptSchema = yup.object().shape({
    code : yup.number().required(),
    name : yup.string().required(),
    shortName : yup.string().required()
  });

function AddDept(props) {
    const { register, handleSubmit, errors } = useForm({resolver:yupResolver( DeptSchema )});
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const [added,setAdded] = useState(false);

    const onSubmit=data=>{
        setLoading(true);
        var { code,name,shortName } = data;
        axios.post('http://localhost:5000/admin/deptAdd',{
            token:localStorage.getItem('token'),code,name,shortName
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
        return <div>Added Department Succesfully</div>
    if(loading)
        return <div>Loading</div>
    return (
        <div id="formbox">  
                <div>
                    {error && <h3>error occured</h3>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>

                <h2> ADD DEPARTMENT</h2>
                    <div id="row">
                        <div id="forminp">
                            <label>Code</label>
                            <input type="number" name="code" ref={register} />
                            {errors.code && <p>{errors.code.message}</p>}   
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Name</label>
                            <input type="text" name="name" ref={register} />
                            {errors.name && <p>{errors.name.message}</p>}     
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Short Name</label>
                             <input type="text" name="shortName" ref={register} /> 
                             {errors.shortName && <p>{errors.shortName.message}</p>}
                        </div>
                    </div>
                    
                    <input type="submit" />
                </form>
        </div>
    )
}

export default AddDept;