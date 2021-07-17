
import gql from "graphql-tag";

export const ALL_PET_LIST = gql`
query AllPet{
  AllPet{
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


 