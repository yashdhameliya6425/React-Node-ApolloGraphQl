import React, { useEffect, useState } from 'react'
import { useQuery } from "@apollo/react-hooks";
import { ALL_PET_LIST } from './Queries';
import Button from 'react-bootstrap/esm/Button'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router';
function PetList() {
    const history = useHistory()
    const { data } = useQuery(ALL_PET_LIST)

  
    return (
        <div>
             
           
            <Table striped bordered hover variant="dark">
                <tr>
                    <th>owner_Name</th>
                    <th>Email</th>
                    <th>Pet_Name</th>
                    <th>Color</th>
                    <th>FavouriteFood</th>
                </tr>
                {data?.AllPet?.map(pet => (


                    <tr>
                        <td>{pet?.owner?.Firstname }</td>
                        <td>{pet?.owner?.Email}</td>
                        <td>{pet.Name}</td>
                        <td>{pet.Color}</td>
                        <td>{pet.favouriteFood}</td>

                    </tr>

                ))}
            </Table>
        </div>

        
    )
}

export default PetList
