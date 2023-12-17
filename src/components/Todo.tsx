import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { atom, useRecoilState } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [],
});

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      description
    }
  }
`;

interface Todo {
  id: string;
  description: string;
}

const TodoList: React.FC = () => {
    const { loading, error, data } = useQuery(GET_TODOS);
    const [todos, setTodos] = useRecoilState(todoListState);
    // const [todos, setTodos] = useRecoilState<Todo[]>(todoListState);
    const [inputValue, setInputValue] = useState<string>('');
    const [updateTodoMutation] = useMutation(UPDATE_TODO);
  
    useEffect(() => {
      if (data) {
        console.log("Fetched Todos:", data.todos);
  
        const uniqueTodos = data.todos.filter(
          (todo: Todo, index: number, self: Todo[]) =>
            index === self.findIndex(t => t.id === todo.id)
        );
  
        if (uniqueTodos.length !== data.todos.length) {
          console.warn("Filtered out duplicate todos.");
        }
  
        setTodos(uniqueTodos);
      }
    }, [data, setTodos]);
  
    const handleUpdateTodo = () => {
        if (inputValue.trim()) {
          updateTodoMutation({
            variables: {
              input: {
                description: inputValue,
              },
            },
          })
          .then(response => {
            const newTodo = response.data.updateTodo;
            setTodos(oldTodos => [...oldTodos, newTodo]);
            setInputValue('');
          }).catch(error => {
            console.error("Error adding todo:", error);
          });
        }
    };

  const handleDeleteTodo = (id: number) => {
    setTodos((oldTodos) => oldTodos.filter(todo => todo !== id));
  };

  return (
    <div className="p-4 w-[50vw] mx-auto mt-10 bg-white rounded-xl shadow-md relative">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add a todo..."
          className="w-full p-2 border rounded-md"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={handleUpdateTodo}
          className="absolute rounded-md px-6 right-[2vw] mt-2 text-sm p-1 bg-blue-500 text-white  hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="mb-2 p-2 border rounded-md flex justify-between items-center">
            {todo.description}
            <button
              onClick={() => handleDeleteTodo(Number(todo.id))}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
