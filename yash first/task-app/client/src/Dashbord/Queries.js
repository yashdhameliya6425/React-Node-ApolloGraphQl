
import { subscribe } from "graphql";
import gql from "graphql-tag";


export const USER_PROFILE = gql`
query getUserProfile {
    getUserProfile {
        id
            Firstname
             Lastname
             Username
             Email
             Password
             isAdmin
             isActive
                
    }
}    

`
export const ALL_PET = gql`
query getAllPet{
  getAllPet{
    id
    Name
    Color
    favouriteFood
    owner{
      Firstname
      Email
    }
  }
}

`