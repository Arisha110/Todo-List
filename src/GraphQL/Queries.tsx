import { gql } from "@apollo/client";

export const LOAD_TODOS=gql`
{
    todos  {
        id
        description
    }
}
`;