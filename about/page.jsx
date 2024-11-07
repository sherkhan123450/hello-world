"use client";
import React from "react";
import AboutNav from "@/app/components/aboutComponent/AboutNav";
import AboutDetails from "@/app/components/aboutComponent/AboutDetails";
import styled from "styled-components";

const Page = () => {
  return (
    <Wrapper>
      <AboutNav />
      <AboutDetails />
    </Wrapper>
  );
};

const Wrapper = styled.div`
    width: 100%;
    .container { 
    width: 100%;
    max-width: 1200px;
    padding: 1rem;

    @media (max-width: 768px) {
        padding: 0rem;
    }
  }

  
  

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    gap : 2rem;

   
    @media (min-width: 768px) {
        .image{
        width:400px ;
        height:   280px;
      }



    }

    @media (max-width: 768px) {
      flex-direction: column;
      padding : 0 ;

      .image {
        width: 100% !important;
        max-height: 400px !important;
        
        margin-top : -32px ;
    }


    }


  }
.image {
    flex : 0.8 ;
      width: 100% !important;
      height: auto;
      object-fit: cover;
    }

  
  .description {
    flex : 1 ;
    color: #4a5568; /* Tailwind gray-700 equivalent */
    h2 {
    font-size : 2rem;
    color : #ffbc40;
  }

  @media (max-width: 768px) {
     padding :0  5vw ;

    }

    @media (max-width: 425px) {
        width: 100%;
        font-size: 12px;
      h2{
        font-size: 1.5rem;
      }


    }


  }

  .title {
    color: #ffbc40; /* Custom color */
    font-size: 2rem; /* Font size equivalent to 'text-2xl' in Tailwind */
    font-weight: 700; /* Tailwind's 'font-bold' equivalent */
    margin-bottom: 1rem; /* Space below the title */
    line-height: 1.2; /* Add line height for better readability */
    text-align: center;
  }
`;

export default Page;
