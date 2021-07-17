import {gql} from 'apollo-server-express'

export default gql`
extend type Query {
    # getAllUser:[User!]!
    getUserById:[User!]!
    getUserProfile:User!
    getAllUser(page: Int, limit: Int ) : UserPaginate
   
}


extend type Mutation {
    
    registerUser(newUser: UserInput!): AuthResp!
    loginUser(Email: String!, Password: String!): signInResp!
    updateUser(newUser: UserInput): User!
    deleteUser(id: ID!): Notification!
    deActive(isActive:Boolean!,id: ID!):User!
    changeNewPassword(Input:ChandPassInput):messagePass!
    forgetPassWord(Email: String!):Notification!
    resatePassWord(Password:String!,code:String!,Email:String):Boolean!

    }
   
    
  input ChandPassInput {
    oldPassword:String
    newPassword:String
    conFirmPassword:String
  }  


type messagePass {
   message: String
   success: Boolean
  }
 
   input UserInput {
       Firstname: String! 
       Lastname: String!
       Username: String!
       Email:String!
       Password:String
       isAdmin:Boolean
       isActive:Boolean
    }
    
    type UserPaginate {
        count: Int
        data: [User]
    }

    input userSort {
        key: String
        type: Int
    }

    type User {
        id:ID!
        Firstname: String! 
        Lastname: String!
        Username: String!
        Email:String!
        Password:String
        isAdmin:Boolean
        isActive:Boolean

    }

    type Notification {
        id: ID!
        message: String
        success: Boolean
    }
 

    type AuthResp {
        user: User!,
      
    }
    type signInResp {
        user: User!,
        token: String!
    }
    extend type Subscription {
        UserChange:UserSubscribe
    }

    type UserSubscribe {
        keyType:String
        data: User!
    }

` 