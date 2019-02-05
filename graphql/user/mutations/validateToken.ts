import { gql } from "apollo-boost";

export const validateTokenMutation = gql`
  mutation ValidateToken($token: String!) {
    validateToken(token: $token)
  }
`;
