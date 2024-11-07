// pages/FoodItemsPage.js
"use client";
import React from "react";
import GridListToggle from "@/app/components/foodItemsComponents/GridAndListView";
import Filter from "@/app/components/foodItemsComponents/FoodFilter";
import FoodPageItems from "@/app/components/foodItemsComponents/FoodPageItems";
import styled from "styled-components";

const FoodItemsPage = () => {
  return (
    <Wrapper>
      <Top>
        <Filter />
        <GridListToggle />
      </Top>
      <FoodPageItems />
    </Wrapper>
  );
};

export default FoodItemsPage;

const Top = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  border-top : 1px solid #ffbc40;
  padding : 5px 2rem;

  @media(max-width: 768px) {
    flex-direction: column;
  }
  @media (min-width: 1024px) {
 
 width : 80%;
margin : 0 auto;
}



`;

const Wrapper = styled.div``;
