import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Components/Home";
import Memes from "./Components/Memes";
import MemesID from "./Components/MemesId";

export default function App(){
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/memes">
                    <Memes />
                </Route>
                <Route exact path="/memes/:id" >
                    <MemesID />
                </Route>
            </Switch>
        </Router>
    );
}