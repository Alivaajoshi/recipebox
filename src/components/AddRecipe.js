import React, {useContext, useState}from "react";
import {TailSpin} from "react-loader-spinner";
import {addDoc} from "firebase/firestore";
import { recipesRef } from "../firebase/firebase";
import swal from 'sweetalert'
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const useAppstate = useContext(Appstate);
  const navigate=useNavigate();
    const[form,setForm]= useState({
    name:"",
    ingredients:"",
    description:"",
    image:"",
    rated:0,
    rating:0
});
const[loading, setLoading]= useState(false);

const addRecipe = async () => {
  setLoading(true);  
  try{
    if(useAppstate.login){
  await addDoc(recipesRef,form);
swal({
  title:"Sucessfully Added",
  icon:"success",
  button:false,
  timer:3000
})
   setForm({
    name:"",
    ingredients:"",
    description:"",
    image:""
    
   })
    }else{
      navigate('/login')
    }
  }catch(error){
    swal({
      name:error,
      icon:"error",
      button:false,
      timer:3000
    })
  }
  setLoading(false);
}


  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-4xl font-large title-font font-bold mb-4 text-black">
              Share Your Flavor-Packed Recipes!!
            </h1>
            <p class="lg:w-2/3 mx-auto text-black-500 leading-relaxed text-base">
              
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 font-bold text-sm text-3xl text-bold text-black-500">
                  Recipe Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({...form,name:e.target.value})}
                    class="w-full bg-gray-100 bg-opacity-50 font-bold rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-black-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />

                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="" class="leading-7 font-bold text-sm text-black-500">
                   Ingredients Required
                  </label>
                  <input
                    type="text"
                    id="text"
                    name=""
                    value={form.ingredients}
                    onChange={(e) => setForm({...form,ingredients:e.target.value})}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
              </div>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-black-500">
                    Recipe Description 
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) => setForm({...form,description:e.target.value})}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-400 focus:bg-white focus:ring-2 focus:ring-yellow-400 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-black-500">
                  Image Link 
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e) => setForm({...form,image:e.target.value})}
                    class="w-full bg-gray-100 bg-opacity-50 font-bold rounded border border-grey-500 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-black-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              <div class="p-2 w-full">
                <button onClick={addRecipe}class="flex mx-auto text-white bg-yellow-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded text-2xl font-bold ">
                { loading ? <TailSpin height={25} color="white"/> : 'Submit'}

                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddRecipe;
