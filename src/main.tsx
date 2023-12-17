import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RecoilRoot> */}
       <App />
    {/* </RecoilRoot> */}
   
  </React.StrictMode>,
)


// import './App.css'
// import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue,  } from 'recoil';

// function App() {

//   return (

//     <div>
//       <RecoilRoot>
//         <h1>Char Counter</h1>
//         <CharCount />
//         <CharCount2/>
//       </RecoilRoot>

//     </div>
//   )
// }

// const charAtom = atom({
//   key: 'charState',
//   default: "hello"
// })

// function CharCount() {
//   const[num, setNum]=useRecoilState(charAtom);

//   return (

//     <div>
//           {num}
//     </div>
//   );
// }

// const charCountSelector= selector({
//   key:'charCountSelector',
//   get:({get})=>{
//     const text = get(charAtom);
//     return text.length;
//   }
// })

// function CharCount2(){
//   return(<div>
//     {useRecoilValue(charCountSelector)}
//   </div>)
// }


// export default App
