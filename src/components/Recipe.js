import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Audio, ColorRing } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { recipesRef } from "../firebase/firebase";
import { Link } from "react-router-dom";

const Recipe = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(recipesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getData();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return ( 
    <div>
        <Carousel {...settings} >
          <Wrap>
            <a>
              <img src="/Images/slide5.jpeg" alt="" />
            </a>
          </Wrap>
          <Wrap>
            <a>
              <img src="/Images/slider3.jpeg" alt="" />
            </a>
          </Wrap>
          <Wrap>
            <a>
              <img src="/Images/slide4.jpeg" alt="" />
            </a>
          </Wrap>
        </Carousel>
    
 

      <div className="flex flex-wrap justify-between p-3 mt-2 ">
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <ColorRing height={40} color="white" />
          </div>
        ) : (
          data.map((e, i) => {
            return(
            <Link to={`/detail/${e.id}`}><div key={i} className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer p-6 mt-6 transition-all duration-500">
            <img className="h-60 md:h-60 mt-3" src={e.image} />
            <h1>
              {e.name}
            </h1>
            <h1 className="flex items-center">
              <span className="text-black mr-1">Rating:</span>
              <ReactStars
                size={20}
                half={true}
                value={e.rating/e.rated}
                edit={false}
              />
            </h1>
           
          </div></Link>
            );
          })
        )}
      </div>
    </div>
  );
};

const Carousel = styled(Slider)`
    margin-top: 20px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color:rgb(150,158,171);
    }
  }
  li.slick-active button:before {
    color: gray;
  }
  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }
`;
const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0  0 /69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
  }
 
  img {
    height: 100%;
    width: 100%; 
    
  }
  &:hover {
    padding: 0;
    border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
`;

export default Recipe;
