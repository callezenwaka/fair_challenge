import { gql } from "@apollo/client";

export const GET_TOKENS = gql`
  query getTokens {
    tokens {
      id
      name
      launch
    }
  }
`;