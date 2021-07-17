
import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE } from './Queries';
import { EDIT_USER } from "./mutation"
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import { CREATE_PET, DELETE_PET, EDIT_PET } from './mutation'
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/Table'
import { SUBSCRIPTION_PET } from './subscription';
import "./modal.css"
import { ALL_PET } from './Queries';


function Bord() {
    const [profile, setprofile] = useState()
    const [pet, setPet] = useState([])
    const [show, setShow] = useState(false);
    const [modPro, setmodPro] = useState(false);
    const history = useHistory()
    const token = localStorage.getItem('token')
    let { data, refetch } = useQuery(USER_PROFILE);
    const [updateUser] = useMutation(EDIT_USER)
    const { data: allData, refetch: refatchdata, subscribeToMore } = useQuery(ALL_PET)


    const [edit, setEdit] = useState({
        Firstname: '',
        Lastname: '',
        Username: '',
        Email: '',
    })
    const [createNewPet] = useMutation(CREATE_PET)
    const [createPet, setCreatePet] = useState({
        Name: '',
        type: '',
        Color: '',
        favouriteFood: ''

    })
    console.log("allData",allData)

    const [deletePet] = useMutation(DELETE_PET)
    const [updatePet] = useMutation(EDIT_PET)


    useEffect(() => {
        try {
            if (subscribeToMore) {
                const unsubscribe = subscribeToMore({
                    document: SUBSCRIPTION_PET,
                    updateQuery: (previousResult, { subscriptionData }) => {
                        if (!subscriptionData.data) {
                            return previousResult;
                        }
                        const { PetChange } = subscriptionData.data;
                       
                        if (PetChange && PetChange.keyType === "PET_CREATED") {
                            let newData = [
                                PetChange.data,
                                previousResult.getAllPet,
                            ];
                            return {
                                ...previousResult,
                                getAllPet:{
                                    ...previousResult.getAllPet,
                                    data: newData,
                                },
                            };

                        }
                        if (PetChange && PetChange.keyType === "DELETE_PET") {
                            let newData = previousResult.getAllPet.filter((res) => res.id !== PetChange.data.id)

                            return {
                                getAllPet: {
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



    useEffect(async () => {
        const temp = data?.getUserProfile
        if (data?.getUserProfile) {
            setprofile(temp)
            refetch()
        }
        setEdit({
            Firstname: temp?.Firstname,
            Lastname: temp?.Lastname,
            Username: temp?.Username,
            Email: temp?.Email,
        })
    }, [data])

    const onLogout = () => {
        setprofile('')
        localStorage.removeItem('token')
        history.push("/")
        data = undefined
    }

    const changeHandler = (event) => {
        setEdit({
            ...edit,
            [event.target.name]: event.target.value
        })
    }

    const AddChange = (event) => {
        setCreatePet({
            ...createPet,
            [event.target.name]: event.target.value

        })

    }

    useEffect(async () => {
        refatchdata()
    }, [])


    const editHandler = (e) => {
        e.preventDefault()
        updateUser({
            variables: edit,
        }).then(data => {
            if (data) {
                toast.success(" Edit SuccessFull")
                setmodPro(false)
                
            }
        })
    }

    const handleClose = () => setShow(false);

    const handleClose2 = () => setmodPro(false)
    console.log("createPet", createPet)

    const AddHandler = () => {
        if (!createPet?.id) {
             createNewPet({
                variables: createPet,
            }).then(res => {
                if (res) {
                    toast.success("Add successFull")
                    setShow(false);
                    refatchdata()
                }
            })
        } else {

            updatePet({
                variables: createPet
            }).then(res => {
                if (res) {
                    toast.success("update successFull")
                    setShow(false);
                    refatchdata()
                }
            })
        }


    }

    const Listhandler = () => {
        history.push('/UserList')
    }

    const deleteHandler = (value) => {
        console.log("value", value);
        deletePet({
            variables: { id: value }
        })
            .then(res => {
                if (res) {
                    toast.success("delete Pet successful")
                    refatchdata()
                }

            })
            .catch(err => {
                toast.error(err);
            })


    }

    const updatHandler = (value) => {
        console.log("value1212", value)
        setShow(true)
        setCreatePet(value)

        console.log("data", data);


    }

     const AllpetHandler = ()=>{
         history.push("/PetList")
     }


     const ChangPass=()=>{
         history.push("/ChangPass")
     }


    


    return (
        <div style={{background:" rgb(0 123 255 / 32%)"}}>

            <div>
                <img onClick={onLogout} src="https://st2.depositphotos.com/4103319/6625/i/600/depositphotos_66251761-stock-photo-logout-circular-icon-on-white.jpg" style={{ height: " 120px", marginLeft: "2058px",borderRadius:"110px" }}></img>
            </div>
            <div>
                <img onClick={() => setmodPro(true)} src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" style={{ height: " 142px", marginLeft: "790px", marginBlockStart: " -100px" ,borderRadius:"10px"}}

                />
                
               <img  onClick ={()=>ChangPass()}src="https://www.j2store.org/images/extensions/apps/apps_preview_image/change_password_preview.png"style={{ height: " 142px", marginLeft: "500px", marginBlockStart: " -100px" ,borderRadius:"100px"}}/>
            </div>

            <div>
                <div>
                    <Modal show={modPro} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>USER_PROFILE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {profile &&
                                <>
                                    <h3>in a busy</h3>
                                    <input type="text" name='Firstname' onChange={changeHandler} value={edit.Firstname}></input>
                                    <input type="text" name='Lastname' onChange={changeHandler} value={edit.Lastname}></input>
                                    <input type="text" name='Username' onChange={changeHandler} value={edit.Username}></input>
                                    <input type="text" name="Email" onChange={changeHandler} value={edit.Email}></input>
                                    {
                                        profile.isAdmin === true ?
                                            <img  onClick={Listhandler} style={{width:"90px",marginInlineStart:"40px",marginBlockStart:"-358px",borderRadius:"109px"}} src="https://store-images.s-microsoft.com/image/apps.25871.53baf1fd-a88b-421e-96ea-18e584d3df32.2263e8ca-1f9f-4991-8937-d1c42f79ccc3.2fed0e10-4552-446e-b131-5cabd645b924.png"></img>: ""
                                    }


{
                                   profile.isAdmin === true ?
                                   <Button  variant="link"style={{marginLeft:"20px",marginTop:"20px"}}onClick={AllpetHandler}>All_Pet_List</Button>:""

}
                                </>
                            }

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2} >
                                Close
                          </Button>
                            <Button type="primary" onClick={editHandler}>Edit</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>


            <div>

                <img onClick={() => { setShow(true); setCreatePet({}) }} style={{margin: "49px" ,width:"70px",borderRadius:"80px" }}src="https://picaflor-azul.com/images/plus-circle1.png"></img>
                
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton >
                    <Modal.Title>ADD PET</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <lable>Pet_Name :</lable><br /><br />
                        <input type="text" name='Name' onChange={AddChange} value={createPet.Name}></input><br /><br />
                        <label>Color :</label><br /><br />
                        <input type="text" name='Color' onChange={AddChange} value={createPet.Color}></input><br /><br />
                        <label>Favourite_Food :</label><br /><br />
                        <input type="text" name="favouriteFood" onChange={AddChange} value={createPet.favouriteFood}></input>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
          </Button>
                    <Button type="primary" onClick={AddHandler} >Add Pet</Button>
                </Modal.Footer>
            </Modal>

            {/* <PetTable allData={allData} /> */}
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th> Owner</th>
                            <th> Pet_Name</th>
                            <th>Color</th>
                            <th>Fav_Food</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData?.getAllPet?.map((pet) => (

                            <tr>
                                <td>{pet.owner.Firstname}</td> 
                                <td>{pet.Name}</td>
                                <td>{pet.Color}</td>
                                <td>{pet.favouriteFood}</td>

                                <td>

                                    <Button variant="outline-danger" danger onClick={() => deleteHandler(pet.id)}>
                                        Delete
                                            </Button>
                                    <Button style={{ marginLeft: "20px" }} variant="outline-primary" onClick={() => updatHandler(pet)}>update</Button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>

        </div>

    )
}

export default Bord

