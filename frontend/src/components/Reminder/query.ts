import { gql } from "@apollo/client";

// export const GET_TOKEN = gql`
//   query getToken($id: Int!) {
//     token(id: $id) {
//       id
//       name
//       launch
//     }
//   }
// `;

// export const UPDATE_PASSWORD = gql`
//   mutation updatePassword(
//     $username: String!
//     $oldPassword: String!
//     $newPassword: String!
//   ) {
//     updatePassword(
//       username: $username
//       oldPassword: $oldPassword
//       newPassword: $newPassword
//     ) {
//       message
//     }
//   }
// `;

export const SET_REMINDER = gql`
mutation setReminder($id: Int!, address: String!) {
  setReminder(
    id: $id
    address: $address
  ) {
    id
    name
    launch
  }
}
`;