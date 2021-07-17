import gql from "graphql-tag";


export const DEACTVE_USER = gql`
    mutation deActive($isActive:Boolean!,$id: ID!){
        deActive(isActive:$isActive,id:$id) {
            Firstname
            Lastname
               Email
               isActive
           
        }
    }
    `
export const DELETE_USER = gql`
mutation deleteUser($id: ID!) {
    deleteUser(id:$id){
        id 
        success 
        message
    }
}
`