import {gql} from 'apollo-server-express'

export default gql`

type Query {
    _:Boolean!
}
type Mutation {
    _:Boolean!
}
type Subscription {
    _:Boolean
}
`;