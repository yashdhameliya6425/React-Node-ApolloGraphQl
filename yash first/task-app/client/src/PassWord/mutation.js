
 import gql from "graphql-tag";

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD($Password:String!,$code:String!,$Email:String){
            resatePassWord(
            Password:$Password,
             code:$code,
             Email:$Email
           )          
       }
`
export const CHANGE_PASSWORD = gql`
    mutation CHANGE_PASSWORD($oldPassword: String!, $newPassword: String!, $conFirmPassword: String!){
        changeNewPassword(
            Input: {
                oldPassword: $oldPassword
                newPassword: $newPassword
                conFirmPassword: $conFirmPassword
                
            }
        ) {
            message
            success
        }
    }
`
