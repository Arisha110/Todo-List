import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import UPDATE_TODO from '../GraphQL/Mutations';

const Form = () => {

  
  const [inputValue, setInputValue] = useState<string>('');
  const [updateTodoMutation] = useMutation(UPDATE_TODO);

  // useEffect(() => {
  //   if (data) {
  //     console.log("Fetched Todos:", data.todos);
      
  //     const uniqueTodos = data.todos.filter((todo, index, self) => 
  //       index === self.findIndex(t => t.id === todo.id)
  //     );

  //     if (uniqueTodos.length !== data.todos.length) {
  //       console.warn("Filtered out duplicate todos.");
  //     }

  //     setTodos(uniqueTodos);
  //   }
  // }, [data]);

  const handleUpdateTodo = () => {
    if (inputValue.trim()) {
      updateTodoMutation({
        variables: {
          input: {
            description: inputValue
          }
        }
      }).then(response => {
        const newTodo = response.data.updateTodo;
        // setTodos(oldTodos => [...oldTodos, newTodo]);
        setInputValue('');
      }).catch(error => {
        console.error("Error adding todo:", error);
      });
    }
  };

  // const handleDeleteTodo = (id: string) => {
  //   setTodos((oldTodos) => oldTodos.filter(todo => todo.id !== id));
  // };



  return (
    <form >
      <input
        className="p-1 rounded-lg outline-none relative w-[30vw] shadow-md"
        type="text"
        placeholder="Enter a Task"
        name="task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={handleUpdateTodo}
        type="submit"
        className="absolute right-[35vw] px-4 bg-blue-600 rounded-lg text-white p-1 text-sm hover:bg-sky-500 mt-0.5 mr-1"
      >
        Add
      </button>
    </form>
  );
};

export default Form;


// import React from 'react'
// import { useMutation } from '@apollo/client';
// import UPDATE_TODO_MUTATION from '../GraphQL/Mutations';




// const Form = () => {
//   return (
//     <form >
//     <input
//       className="p-1 rounded-lg outline-none relative w-[30vw] shadow-md"
//       type="text"
//       placeholder="Enter a Task"
//       name="task"
     
//     />

//     <button
//       type="submit"
//       className="absolute right-[35vw] px-4 bg-blue-600 rounded-lg text-white p-1 text-sm hover:bg-sky-500 mt-0.5 mr-1"
//     >
//       Add
//     </button>
//   </form>
//   )
// }

// export default Form