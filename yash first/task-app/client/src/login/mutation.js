
import gql from "graphql-tag";

  export const LOGIN_USER = gql`
    mutation loginUser($Email:String!, $Password:String!){
             loginUser(Email:$Email , Password: $Password) {
            token
            user {
                id
                Email
                Password 
            }
        }
    }
`
export const FORGET_PASSWORD = gql`
mutation FORGET_PASSWORD($Email:String!){
            forgetPassWord(
              Email:$Email
            ){
              message
              success
            }
}
`
  