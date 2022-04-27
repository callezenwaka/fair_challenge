import { gql } from "@apollo/client";

export const GET_TOKEN = gql`
  query getToken($id: Int!) {
    token(id: $id) {
      id
      name
      launch
    }
  }
`;