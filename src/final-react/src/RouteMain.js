import React from 'react';
import Menu from "./home/menu";
import {Route, Routes} from "react-router-dom";
import Home from "./home/Home";

function RouteMain(props) {
    return (
        <div style={{marginLeft:'100px',marginTop:'50px'}}>
            <Menu/>
            <br style={{clear:'both'}}/><br/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>

                <Route path={"*"} element={
                    <div>
                        <img alt={''} src={'404.png'} style={{width:'400px'}}/>
                    </div>
                }/>

            </Routes>
        </div>
    );
}

export default RouteMain;