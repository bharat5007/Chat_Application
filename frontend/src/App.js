import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Autherization from "./components/Autherization"; 
import { useUserContext } from "./components/contextapi/XUser";
import Chat from "./components/Chat";


function App() {
  const {xuser}=useUserContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Autherization} exact >  </Route>
        <Route path='/chats' element={ xuser ? <Chat/> : <Navigate to={"/"} />}/>
      </Routes>
    </div>
  );
}

export default App;
