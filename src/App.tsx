import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client'
import './App.css'
import { RecoilRoot, atom, useRecoilState } from "recoil";
import Todo from "./components/Todo"
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.error(`GraphQL error: ${message}`);
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
  }
});


const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.mocki.io/v2/c4d7a195/graphql" }),
])
//instantiating an apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});



const App:React.FC = () => {

  // const[todo, setTodo]=useRecoilState(todoAtom)


  return <ApolloProvider client={client} >
    <RecoilRoot>
     


              <div className='w-full h-[100vh] bg-blue-400 flex flex-col items-center'>
                <h1 className="text-3xl text-white font-semibold my-4">Taskify</h1>
                {/* <Form/>
                <GetTodos/> */}
                <Todo/>
              </div>






    </RecoilRoot>

  </ApolloProvider>

}







export default App
