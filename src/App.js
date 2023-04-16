
import './App.css';
import Header from './components/Header';
import Recipe from './components/Recipe';
import {Route,Routes} from 'react-router-dom';
import AddRecipe from './components/AddRecipe';
import Detail from './components/Detail';
import { createContext,useState,useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const Appstate = createContext();
function App() {
  const [login,setLogin]=useState(false);
  const[userName, setUserName]=useState("");

  return (
  <Appstate.Provider value={{login,userName,setLogin,setUserName}}>
    <div className="App relative">
  <Header/> 
  <Routes>
      <Route path="/" element={<Recipe/>}/>  
      <Route path="/addRecipe" element={<AddRecipe />}/>  
      <Route path="/detail/:id" element={<Detail />}/> 
      <Route path="/login" element={<Login />}/> 
      <Route path="/signup" element={<Signup />}/> 
      
      
  </Routes>  
    </div>
    </Appstate.Provider>
  )
}

export default App;
export {Appstate}
