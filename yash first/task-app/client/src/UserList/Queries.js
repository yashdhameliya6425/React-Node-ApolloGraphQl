import gql from "graphql-tag";
// export const ALL_USERLIST = gql`
// query getAllUser{
//    getAllUser{
//        id
//        Firstname
//        Username
//        Lastname
//        Email
//        isAdmin
//        isActive
//        Password
//      }
//    }

// `
export const USER_ACTIVE = gql`
query getUserById {
     getUserById{
       id
       Firstname
       Username
       Email
       Password
       isActive
     }
   }

`
export const ALL_USERLIST = gql`
 query getAllUser($page:Int,$limit:Int){
   getAllUser(page:$page,limit:$limit){
    count
    data{
      id
      Firstname
      Lastname
      Email
      Username
      isActive
      isAdmin
    }
  }
}
`
