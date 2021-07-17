import gql from "graphql-tag";

export const EDIT_USER = gql`
    mutation EDIT_USER($Firstname: String!, $Lastname: String!, $Username: String!,$Email:String!){
        updateUser(
            newUser: {
                Firstname: $Firstname
                Lastname: $Lastname
                Username: $Username
                Email:$Email
            }
        )
         
        {
             
                id
                Firstname
                Lastname
                Username
                Email
                Password

            
        }
    }
`


   export const CREATE_PET = gql`
   mutation CREATE_PET($Name:String!,$Color:String!,$type:String,$favouriteFood:String!){
       createNewPet(
       
                 newPost:{
                   Name:$Name
                   Color:$Color
                   type:$type
                 favouriteFood:$favouriteFood
                 }
               )
          {
                       id
                       Name
                       type
                       Color    
                       favouriteFood
                       owner
                    
                      
                     }
  }
  

`
 export const DELETE_PET = gql`
     mutation deletePet($id: ID!) {
       deletePet(id:$id){
             id 
             success 
             message
         }
     }
 `


  export const EDIT_PET = gql`
  mutation EDIT_PET($Name: String!, $Color: String!, $favouriteFood: String!,$id: ID) {
    updatePet(
      updatedPost: { Name: $Name, Color: $Color, favouriteFood: $favouriteFood,id: $id }
      
    ) {
      id
      Name
      Color
      favouriteFood
    }
  }
`

