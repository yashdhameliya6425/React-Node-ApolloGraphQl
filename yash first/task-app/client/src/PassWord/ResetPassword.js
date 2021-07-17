import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { RESET_PASSWORD } from './mutation'
import Button from 'react-bootstrap/esm/Button'
function ResetPassword() {
    const history = useHistory()
    const [resatePassWord]= useMutation(RESET_PASSWORD)
    const [resetPassWord,setResetPassword]=useState({
        code:"",
        Email:"",
        Password:""
    })

const PassHandler=(e)=>{
    setResetPassword({
        ...resetPassWord,
        [e.target.name]:e.target.value
    })
}

const PassReset=()=>{
    resatePassWord({
        variables:resetPassWord
    }).then(data=>{
        console.log('res',data);
        if(data){
            toast.success('Your Password Reset SuccessFull')
            history.push('/')
        
        }
           
    }).catch(err=>{console.log(err);})
}

    return (
        <div style={{textAlign:"center"}}>
             <div id="example2">
          <form>
              <h2 style={{color:"blue"}}>Reset-Password</h2>
              <div>
                  <input type="text" name="Email"  onChange={PassHandler} value={resetPassWord.Email} placeholder="Enter Your Email" /><br></br>
                  <input type="text"  name="code"  onChange={PassHandler} value={resetPassWord.code} placeholder="Enter Your code" /><br></br>
                  <input type="text"  name="Password" onChange={PassHandler} value={resetPassWord.Password} placeholder="Enter Your PassWord" />
              </div>

              <Button style={{marginTop:"30px"}} onClick={PassReset}>Submit</Button>
          </form>
          </div>
        </div>
    )
}

export default ResetPassword
