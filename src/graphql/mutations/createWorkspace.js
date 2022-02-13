import { gql } from "@apollo/client";

export const CREATE_WORKSPACE = gql`
  mutation createWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
      name
      created_at
      owner {
        id
        name
        email
      }
      users {
        id
        name
      }
      notes {
        id
        title
      }
    }
  }
`;
