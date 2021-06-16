import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MemesID(props){

    const [list,setList]=useState([]);
    const {id}=useParams();
    useEffect(()=>{
        console.log(typeof(id));
        axios({
            method: 'get',
            url: 'http://localhost:8081/memes/'+id
        })
        .then((res)=>setList(JSON.stringify(res.data)));
    });
    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    );
}