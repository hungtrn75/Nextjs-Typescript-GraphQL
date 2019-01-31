import { gql } from "apollo-boost";

export const loginMutation = gql`
  query Me {
    me {
      email
      firstName
      lastName
      name
    }
  }
`;
