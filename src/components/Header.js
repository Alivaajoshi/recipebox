import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppstate=useContext(Appstate);

  return (
    <div className="sticky z-10 bg-black top-0 bg-black  text-3xl flex justify-between items-center p-1 text-yellow-500 font-bold p-6">
    <Link to="/"><span>Recipe<span className="text-white">Box</span></span></Link>
     <div>
     {useAppstate.login ?
      <Link to={"/addRecipe"}><Add className="text-xl mr-1 text-yellow-500 flex  items-center">Add New</Add></Link>  
      : 
      <Link to={"/login"}><Add className="text-xl mr-1 text-yellow-500 flex  items-center">Login</Add></Link>  
     }
     </div>
    </div>
   
  );
};
const Add=styled.div`
background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  position: absolute;
  top: 15px;
  right: 10px;

  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
 
`;

export default Header;
