import gql from "graphql-tag";

export const SUBSCRIPTION_PET = gql`
subscription PetChange {
    PetChange{
      keyType
      data{
        id
        Name
        type
        Color
        favouriteFood
        owner{
          Firstname
          Lastname
        }
      }
    }
  }

`
