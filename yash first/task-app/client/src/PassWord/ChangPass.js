import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CHANGE_PASSWORD} from './mutation';
import { toast } from 'react-toastify'
import { useHistory } from 'react-router';
import Button from 'react-bootstrap/esm/Button'


function ChangPass() {
    const history = useHistory()
    const [changeNewPassword] =useMutation(CHANGE_PASSWORD)
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        conFirmPassword: ""

    })


    const ChangHandler = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }


    const submitHandler = () => {
        changeNewPassword({
            variables: password
        }).then(data => {
            console.log('data',data);
            toast.success("Password Chang Successfull")
             history.push('/')
            
        }).catch(err => {
            toast.error(err.message);
        })
    }

    
    return (
        <div>
         
           <div>
           <form style={{textAlign:"center"}}>
                        <div>
                            <h1 >Change Password</h1>

                            <label>oldPassword:</label><br /><br />

                            <input type="Password" name="oldPassword" onChange={ChangHandler} placeholder="Enter old Password"  /><br /><br />

                            <label>newPassword:</label><br /><br />

                            <input type="Password" name="newPassword" onChange={ChangHandler} placeholder="Enter new Password" /><br /><br />

                            <label>confirmPassword:</label><br /><br />

                            <input type="Password" name="conFirmPassword" onChange={ChangHandler} placeholder="Enter conFirm Password"  /><br /><br />

                            <Button onClick={submitHandler}>Submit</Button><br></br>

                           
                        </div>
                    </form>
           </div>
        </div>
    )
}

export default ChangPass
