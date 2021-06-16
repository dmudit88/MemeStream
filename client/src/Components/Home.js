import React, {useEffect, useState} from "react";
import axios from "axios";
export default function Home(){
    const [list,setList]=useState([]);
    const [name,setName]=useState("");
    const [caption,setCaption]=useState("");
    const [url,setURL]=useState("");
    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:8081/memes'
        })
        .then((res)=>setList(res.data));
    });

    const handleSubmit= (evt) => {
        evt.preventDefault();
        axios.post('http://localhost:8081/memes',{
            name,
            caption,
            url
        })
        .then(res => console.log(res))
        alert("Submitted successfully");
    };
    return (
        <React.Fragment>
        <form onSubmit={handleSubmit} className="sticky-top rounded" style={{background: "linear-gradient(to bottom, #33ccff 0%, #ff99cc 100%)",border: '2px solid red'}}>
        <h1 className="text-info"> Meme Stream</h1>
        <div className="mb-3">
          <label for="name" className="form-label">Meme Owner</label>
          <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Enter your full name" />
        </div>
        <div className="mb-3">
          <label for="caption" className="form-label">Caption</label>
          <input type="text" className="form-control" name="caption" value={caption} onChange={e => setCaption(e.target.value)}id="caption" placeholder="Be creative with caption" />
        </div>
        <div className="mb-3">
            <label for="url" className="form-label">Meme URL</label>
            <input type="text" className="form-control" name="url" value={url} onChange={e => setURL(e.target.value)} id="url" placeholder="Enter URL of your meme here" />
        </div>
        <button type="submit" className="btn btn-outline-primary">Submit Meme</button>
    </form>
    <div className="container">
        {list.map((ele)=>{
            return (
                    <div className="card border mt-5" style={{width: "18rem",margin: "0 auto"}}>
                        <img className="card-img-top" src={ele.url} alt="" />
                        <div className="card-body">
                            <h5 className="card-title">{ele.caption}</h5>
                            <p className="card-text">{ele.name}</p>
                        </div>
                    </div>
            );
        })}
    </div>
        </React.Fragment>
    );
}
