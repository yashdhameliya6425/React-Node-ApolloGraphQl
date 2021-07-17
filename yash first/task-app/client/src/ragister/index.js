import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useMutation } from "@apollo/react-hooks";
import { REGISTRATION_USER } from './Mutation'
import './ragister.css'

function Ragi() {
    const history = useHistory();
    const [registerUser] = useMutation(REGISTRATION_USER)

    const [Ragister, setRagister] = useState({
        Firstname: "",
        Lastname: "",
        Username:"",
        Email:"",
        Password: "",

    })
    console.log("registerUser", registerUser);

    const ChangeHandler = (event) => {
        setRagister({
            ...Ragister,
            [event.target.name]: event.target.value,
        })
    }
    const submtHandler = (e) => {

        e.preventDefault()
        registerUser({
            variables: Ragister
        }).then(data => {
            console.log("helloolnjnui");

            history.push("/")
            toast.success("Ragistation success")

        }).catch(err => {
            toast.error(err.message);
        })
    }

    const loginHandler = () => {
        history.push('/')
    }

    return (
        <>
  
            <div>
                <form class="form" >
                  
                    <div style={{textAlign:"center"}}>
                    <div id="example2" className="bg-img">
                    <center><b>Registration</b></center>
                        <input type="text" placeholder="Enter name" onChange={ChangeHandler} name="Firstname" /><br /><br />
                    
                        <input type="text" placeholder="Enter LastName" onChange={ChangeHandler} name="Lastname" /><br /><br />
                        
                        <input type="text" placeholder="Enter UserName" onChange={ChangeHandler} name="Username" /><br /><br />
                      
                        <input type="text" placeholder="Enter Email" onChange={ChangeHandler} name="Email" /><br /><br />
                      
                        <input type="text" placeholder=" Enter Password" onChange={ChangeHandler} name="Password" /><br /><br />
                        
                       


                  <div>
                      <Button  class="btn btn-primary"  style={{margin:"10px"}}  onClick={submtHandler}>Register</Button>
                      <Button  class="btn btn-primary"  onClick={loginHandler}>Login</Button>
                      </div>
                      </div>
                      </div>

                 </form>
                
            </div>

        </>
    )
}

export default Ragi
