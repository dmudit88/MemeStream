import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Memes(){

    const [list,setList]=useState([]);
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:8081/memes'
        })
        .then((res)=>setList(JSON.stringify(res.data)));
    });
    return (
        <React.Fragment>
            {list}
        </React.Fragment>
    );
}