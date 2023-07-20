import React, { useEffect, useState } from "react";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import axios from 'axios'
import './admin.css'


export function Adminedit(){

    const [datas,setDatas]=useState([])
    useEffect(()=>{
        fetch("http://localhost:3307/studentdet")
        .then(res=>res.json())
        .then(datas=>setDatas(datas))
        // console.log(datas);
    },[])
    const data_del = (Emp_id)=>{
        var datastring ={Emp_id:Emp_id};
        var config = {headers:{"enctype":"multipart/form-data"}};
        axios.post('http://localhost:3307/Delete',datastring,config)
        .then(function(res){
            if(res.data.status === 'error'){
                alert('error');
                window.location.reload();
            }
            else if(res.data.status === 'success'){
                alert("deleted");
                window.location.reload();
            }
        })
        .catch(function(error){
            alert(error);
            window.location.reload();
        })
    }
    const handleDownload = () => {
        fetch('http://localhost:3307/download')
          .then((response) => response.blob())
          .then((blob) => {
        //link for trigger download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => console.error('Error downloading file:', error));
       };
    


    return(<>

<div className="backgrounpic  ">
    <h1 className="text-center p-2 ">Employee Detailes</h1>
        <table className="table1" >
            <thead >
            <tr className="table1">
                <th>S.NO</th>
                <th>Name</th>
                <th>Place</th>
                <th>Role</th>
                <th>Phone NO</th>
                <th>Salary</th>
                <th>Hire Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
           <tbody >{
            
           datas.map((value,index)=>(
    <>
            <tr>
                <td className="border border-dark">{value.Emp_id}</td> 
                <td className="border border-dark">{value.Name}</td>
                <td className="border border-dark">{value.Place}</td>
                <td className="border border-dark">{value.Role}</td>
                <td className="border border-dark">{value.MobileNo}</td>
                <td className="border border-dark">{value.Salary}</td>
                <td className="border border-dark">{value.HireDate}</td>
                <td className="border text-center border-dark" ><Link to={`/edit/${value.Emp_id}`} className=" text-dark nav-link">{<PencilSquare className="text-secondary"/>} Edit</Link></td>
                <td className="border text-center border-dark" ><button type="button"  className="btn btn-danger" onClick={()=>{data_del(value.Emp_id)}}>Delete</button></td>
            </tr>
    </>
           
           
            
           ))
           }




     </tbody>     

   </table><br/>
   <p className="text-center"> <button className="btn btn-primary" onClick={handleDownload}>Download CSV</button></p>
   <p className="text-center"><Link to='/registration' > <button className="btn btn-success">ADD Employee</button></Link></p>

    </div>




    
    </>);
}