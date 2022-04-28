import { gql } from "@apollo/client";

export const SET_REMINDER = gql`
mutation setReminder($id: Int!, $address: String!) {
  setReminder(
    reminderInput: {
      id: $id
      address: $address
    }) {
    id
    name
    launch
  }
}
`;