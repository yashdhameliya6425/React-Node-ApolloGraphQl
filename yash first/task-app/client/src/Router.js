import React from 'react'

import{BrowserRouter,Route,Switch}from 'react-router-dom'
import Login from './login'
import Register from './ragister'
import Bord from './Dashbord/index';
import UserList  from './UserList/index'
import PetList from './PetList/PetList';
import ResetPassword  from './PassWord/ResetPassword';
import ChangPass from './PassWord/ChangPass';



const Router = ()=>{
    return (
        <div>
            <BrowserRouter>
                    <Switch>       
                        <Route exact path="/" component={Login}></Route>
                        <Route exact path="/register" component={Register}></Route>      
                        <Route exact path="/Bord"   component={Bord}></Route> 
                        <Route exact path="/UserList"   component={UserList}></Route>  
                        <Route exact path="/PetList"   component={PetList}></Route>
                        <Route exact path="/ChangPass" component={ChangPass}></Route>
                        <Route exact path="/ResetPassword/:code" component={ResetPassword}></Route>                          
                    </Switch>
            </BrowserRouter>


       </div>
    )
}
export default Router