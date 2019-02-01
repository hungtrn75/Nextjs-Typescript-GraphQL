import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      firstName
      lastName
      email
      name
    }
  }
`;
