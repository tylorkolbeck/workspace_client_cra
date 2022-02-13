import { gql } from "@apollo/client";

export const VIEW_WORKSPACES = gql`
  query getWorkspaces {
    workspaces {
      id
      name
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
        created_at
        updated_at
      }
    }
  }
`;
