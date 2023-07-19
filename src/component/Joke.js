import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


    const Jokes=(props)=>{

    
    // const[select,setSelect]=useState("");
    const[joke,setJoke]=useState([]);
    useEffect(()=>{
        fetch(`https://api.chucknorris.io/jokes/random?category${props.select}`)
        .then(result=>result.json())
        .then(jokes=>setJoke(jokes))
        
    },[])
    console.log(props.select);
    
    return(
    <>
    <div className="bg-colors"> 
        
        <div className=" row mx-auto col-lg-10"> 
        


        


        </div>
        </div>
    </>);
}
export default Jokes;