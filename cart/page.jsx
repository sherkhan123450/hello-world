"use client";
import React from "react";
import CartItems from "@/app/components/cartComponents/CartItems";
import CartBill from "@/app/components/cartComponents/CartItemsPrice";
import styled from "styled-components";
import Services from "@/app/components/cartComponents/Services";

const CartPage = () => {
  return (
    <Container>
      <CartItems className="cartItems" />
      <Right>
        <CartBill />
        <Services />
      </Right>
    </Container>
  );
};

export default CartPage;

// Styled components
const Container = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 1rem;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 768px) {
    display: block;
    padding: 0.8rem;

    .cartItems {
      transform: scale(0.6);
    }
  }
  @media (max-width: 425px) {
    padding: 0.6rem;
  }
  @media (max-width: 375px) {
    padding: 0.4rem;
  }
  @media (max-width: 329px) {
    padding: 0.2rem;
  }
`;

const Right = styled.div`
  flex: 1;
  max-width: 33vw;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
