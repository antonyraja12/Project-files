import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jokes from "./Joke";

export function Category(){ 



const [select,setSelect]=useState([]);
const [category,setCategory]=useState([]);

  useEffect(()=>{
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(res=>res.json())
    .then(data=>setCategory(data))
},[])

  return (
  
    <>
      <div className="bg-colors"> 
        <h1 className="title">Chuck Norris</h1>
        <div className=" row mx-auto col-lg-10"> 
            

        {
                
                category.map((values,index)=>(
                    <>
                    
                    <div className="col-lg-3 col-3 col-md-6 con-div ">
                    
                  <div className="text-clr rounded-2  text-capitalize bg-white" >{`${values}`}<br/>
                     
                     
                     <span className="fs-6 text-clrs fw-normal  disable">Unlimited jokes on {values}</span></div> 
                   
                
                    </div>
                    
                    </>
                    
                ))
            }
             <div>
                      <h3>joke</h3>
                      <Jokes select={select}/>
                    </div>

        </div>
        </div>
 
  
    </>
  )
}