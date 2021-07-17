import { gql } from 'apollo-server-express'


export default gql`
    extend type Query {
       getAllPet: [Pet!]!
       getPetByID: Pet!
       AllPet:[Pet!]!
    }

    extend type Mutation {
        createNewPet(newPost: PetInput!): PetRes!
        deletePet(id: ID!): PostNotification!
        updatePet(updatedPost: PetInput): PetRes!
    }

    type Pet {
        id: ID!
        Name: String!
        type:String
        Color: String
        favouriteFood: String
        owner:User   
       
    }
    
    type PetRes {
        id: ID!
        Name: String!
        type:String
        Color: String
        favouriteFood: String
        owner:ID
       
    }

    input PetInput {
        Name: String!
        type:String
        Color: String!
        favouriteFood: String!
        owner: String
        id: ID
    }
    
    type PostNotification {
        id: ID!
        message: String
        success: Boolean
    }
    extend type Subscription {
        PetChange:PetSubscribe
    }

    type PetSubscribe {
        keyType:String
        data: Pet!
    }

`;