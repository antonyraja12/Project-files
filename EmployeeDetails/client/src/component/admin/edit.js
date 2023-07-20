import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export function Editmodule(){
    
    
    let {Emp_id}=useParams();


    const [Name,setName]=useState("");
    const [Place,setPlace]=useState("");
    const [Role,setRole]=useState("");
    const[Salary,setSalary]=useState("");
    const[MobileNo,setMobileNo]=useState("")
    // const[DateOfJoining,setDateOfJoining]=useState('');
    useEffect(()=>{
        fetch("http://localhost:3307/edit/"+Emp_id+'')
        .then(res=>res.json())
        .then((res)=>{ 
            setName(res[0].Name)
            setPlace(res[0].Place)
            setRole(res[0].Role)
            setSalary(res[0].Salary)
            setMobileNo(res[0].MobileNo)
        })
        
        
    },[])

        const submission = async(event)=>{
            event.preventDefault();
            var datastring = new FormData(event.target)
            var config={header:{"enctype":"multipart/form-data"}};

            
            await axios.put("http://localhost:3307/updated/"+Emp_id+'',{Name,Place,Role,Salary,MobileNo},config)
            .then((res)=>{
                if(res.data.status==="error"){
                    alert("error");
                    window.location.reload();
                }
                else if(res.data.status==="success"){
                    alert("updated");
                    window.location.href='/'
                }
            },[])
            .catch((error)=>{
                alert("Catch error")
                window.location.reload();
            })

        }
    return(

        <>
          <div className="backgrounpic">


<h1 className="text-center">Edit Module</h1>
<div className="offset-lg-4  ">
    <form onSubmit={submission} >






        <label className="w-25 p-3">Employee Name</label>


        : <input type="text" id="name" name="name" className="inputs p-2"value={Name} onChange={(e)=>setName(e.target.value)} required /><span id="span_name" ></span><br />



        <label className="w-25 p-3">Place</label>
        : <input type="text" id="place" name="place" className="inputs p-2" value={Place} onChange={(e)=>setPlace(e.target.value)} required /><br />


        <label className="w-25 p-3">Designation</label>
        : <input type="text" id="role" name="role" className="inputs p-2" value={Role} onChange={(e)=>setRole(e.target.value)} required /><br />

        <label className="w-25 p-3">Salary</label>
        : <input type="text" id="sal" name="salary" className="inputs p-2" value={Salary} onChange={(e)=>setSalary(e.target.value)} required /><br />

        <label className="w-25 p-3"> Mobile NO </label>
          : <input type="tel" id="phone" name="phone" className="inputs p-2" value={MobileNo}  onChange={(e)=>setMobileNo(e.target.value)} required /><br />
        <p className="text-center"><input type="submit" value="Update" className="btn btn-primary" /></p>



    </form>
</div>
</div>


        </>
    );
}