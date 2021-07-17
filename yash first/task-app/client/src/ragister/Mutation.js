import gql from "graphql-tag";

export const REGISTRATION_USER = gql`
    mutation REGISTER_MY_USER ($Firstname: String!, $Lastname: String!, $Username: String!,$Email:String!,$Password:String!){
        registerUser(
            newUser: {
                Firstname: $Firstname
                Lastname: $Lastname
                Username: $Username
                Email:$Email
                Password:$Password
            }
        ) {
            user {
                id
                Firstname
                Lastname
                Username
                Email
                Password

            }
        }
    }
`

