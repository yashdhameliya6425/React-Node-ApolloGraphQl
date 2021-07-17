import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import {LOGIN_USER,FORGET_PASSWORD} from './mutation'
import { toast } from 'react-toastify';
import './login.css'
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'

function Login() {
    const history = useHistory();
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [loginUser] = useMutation(LOGIN_USER)
    const [forgetPassWord] = useMutation(FORGET_PASSWORD)
    const[login,setlogin] = useState({
        Email:'',
        Password:''
    })
  
    const [forget,setForget] = useState({
        Email:""
    })
    console.log("loginUser",loginUser);

    const submitHandler=(e)=>{
        console.log("login",login);
        e.preventDefault()
        loginUser({
            variables:login
          
        }).then(data=>{  
            toast.success("Login Successfull")
            localStorage.setItem("token",data.data.loginUser.token)
            localStorage.setItem("user",data.data.loginUser.user.id)
            history.push("/Bord")
      
        })
      
           
        .catch(err=>{
            toast.error(err.message);
        })
    }

    const saveHandler=()=>{
        forgetPassWord({
            variables:forget
        }).then(data=>{
            if(data){
                toast.success("Chack your mail")
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    const forgetHandler=()=>{
        setShow(true)
    }

    const RagisterHandler = ()=>{
        history.push("/register")
         
    } 
    
    

    const changeHandler = (event) =>{
        setlogin({
            ...login,
            [event.target.name]:event.target.value,
        })
    }

    const fchangeHandler=(event)=>{
        setForget({
            ...forget,
            [event.target.name]:event.target.value,
        })
    }

    return (
<>
        <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="text" onChange={fchangeHandler} name="Email" placeholder="Email" value={forget.Email} ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>

        <div style={{textAlign:"center"}}>
             <div id="example2">
               <form class="login">
               <center><b>Login</b></center>
               <input type="text" name="Email" onChange={changeHandler} placeholder="Email"/><br/><br/>
               <input type="Password"  name="Password" onChange={changeHandler} placeholder=" Enter Password"/><br/><br/>
               <Button   style={{margin:"10px"}} onClick={submitHandler}>Submit</Button>
               <Button onClick={RagisterHandler}>Register</Button><br></br>
               <Button style={{marginLeft:"20%"}} variant="link" onClick={forgetHandler}>forget_Password</Button>

              </form>
              </div>                                                                                           
          
        </div>
        </>
    )
}

export default Login
