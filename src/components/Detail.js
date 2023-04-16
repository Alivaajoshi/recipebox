
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import {db} from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ColorRing } from 'react-loader-spinner'
import Reviews from './Reviews'

const Detail = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    name: "",
    ingredients: "",
    image: "",
    description: "",
    rating:0,
    rated:0
    
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "recipes", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  },[])

  return (
    <div className='p-3 mt-4 flex flex-col md:flex-row item-center md:items-start w-full justify-center'>
    { loading ? <div className='h-96 flex w-full justify-center items-center'><ColorRing height={30} /></div> : 
      <>
      <img className='h-96 shadow-lg bg-gray-100  p-2 hover:-translate-y-3 transition-all duration-500 ' src={data.image} />
      
      <div className='md:ml-4 ml-0 w-full md:w-1/2'>
        <h1 className='text-4xl font-bold  text-black'>{data.name} </h1>

        <ReactStars
          size={20}
          half={true}
          value={data.rating/data.rated}
          edit={false}
        />
        <h1 className="text-2xl  font-bold mt-2">Ingredients Required:</h1>
        <p className="p-1 text-xl">
          {data.ingredients}
        </p>
        <h1 className='text-2xl p-1 font-bold'>Instruction:</h1>
        <p className='p-1 text-xl'>
         {data.description}
        </p>
      <Reviews id={id} prevRating={data.rating} userRated={data.rated}/>
  
        
      </div>
      </>
    }
    </div>
  )
}

export default Detail
