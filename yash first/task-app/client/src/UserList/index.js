import React, { useEffect, useState } from "react";
import { ALL_USERLIST, USER_ACTIVE } from './Queries'
import { useQuery } from "@apollo/react-hooks";
import { DEACTVE_USER ,DELETE_USER} from "./mutation "
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks'
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table'
import Button from "react-bootstrap/esm/Button";

function UserList() {
    const history = useHistory()
    const [list, setList] = useState()
    const [page,setPage] =useState(1)
    const { data, refetch } = useQuery(ALL_USERLIST,{
        variables:{
            page:page,
            limit:8
        }
    });
    
   console.log("data1222",data)
      
   
    const {data:alldata,refetch:torefatch,subscribeToMore} = useQuery(USER_ACTIVE)

    const [deActive] = useMutation(DEACTVE_USER)
    const [deleteUser] = useMutation(DELETE_USER)
    useEffect(async () => {
        const temp = data?.getAllUser?.data
        if (temp) {
            if ([data?.getAllUser?.data]) {
                await setList(temp)
                console.log("list1234",data);

            }
        }

    }, [data])

    useEffect(() => {
        try {
            if (subscribeToMore) {
                const unsubscribe = subscribeToMore({
                    document: SUBSCRIPTION_USER,
                    updateQuery: (previousResult, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return previousResult;
                        }
                        const { UserChange } = subscriptionData.data;
                        if (UserChange && UserChange.keyType === "USER_DELETE") {
                            let newData = previousResult.getUserById.filter((res) => res.id !== UserChange.data.id)

                            return {
                                getUserById: {
                                    data: newData
                                },
                            };
                        }
                    },
                });
                return () => unsubscribe();
            }

        } catch (error) {
            console.log(error);
        }
    }, [subscribeToMore]);

    const activeHandler = (id) => {
        deActive({
            variables: { id, isActive: false }
        }).then(data=>{
            if(data){
                toast.success(" User DeActivate")
                refetch()
            }
     
        })

    }

    const deactiveHandler =(id)=>{
        deActive({
            variables:{id,isActive:true}
        }).then(data=>{
            if(data){
                toast.success("user Active")
                torefatch()
                
            }
        })
    }

    const RemovHandler =(value)=>{
        console.log("value1234",value);
        deleteUser({
            variables:{id:value}
        }).then(data=>{
            if(data){
                toast.success("user Deleted")
                refetch()
                
            }
        })
    }

    const backHandler=()=>{
        history.push('/Bord')
    }

 
console.log("page",page)
    return (
        <>
            <>
                <h1 style={{color:" #101010",background:" #dbe1e6"}}>User List</h1>
   

                <div>
                    <img onClick={backHandler} style={{marginLeft:"1400px",width:"50px",marginBottom:"34px"}}src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Mika3nV1FaSoP4VtbQDoYUpAC0HZyq48_w&usqp=CAU"></img>
                </div>
            </>
            <Table striped bordered hover variant="dark">
           

                <tr>

                    <th>Firstname</th>
                    <th>LastName</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Acive-DeActive</th>
                    <th>Action</th>
                </tr>
                {
                   list?.map((item) => {
                       console.log("item123",item);
                        return (
                            <tr>
                                <td>{item.Firstname}</td>
                                <td>{item.Lastname}</td>
                                <td>{item.Username}</td>
                                <td>{item.Email}</td>
                                <td>
                                    {
                                    item.isActive ===true ?    
                                    
                                    <Button   variant="success" onClick={() => activeHandler(item.id)}>Active</Button>:<Button  onClick={() => deactiveHandler(item.id)} variant="danger">DeActive</Button>

                                    }
                                     
                                </td>
                                <td>
                                <Button onClick={()=>RemovHandler(item.id)} variant="warning">Delete</Button>
                                </td>
                              
                            </tr>

                            
                        )
                    })
                }
            </Table>
            <div style={{marginLeft:"1400px"}}>
                <Button onClick={()=>setPage(page-1)} >Back</Button>
                <Button style={{marginLeft:"22px"}}>{page}</Button>
                <Button style={{marginLeft:"22px"}} onClick={()=>setPage(page+1)} >Next</Button>
                </div>
        </>

    )
}
export default UserList