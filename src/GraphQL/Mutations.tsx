import { gql } from '@apollo/client';

const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      description
    }
  }
`;

export default UPDATE_TODO;