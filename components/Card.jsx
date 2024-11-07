"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slices/cartSlice";
import { Button } from "./ButtonComponent";
import { useSelector } from "react-redux";

const Card = ({
  name,
  image,
  price = 0,
  netPrice = 0,
  discountAmount = 0,
  id,
  category = "",
  description = "",
}) => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?.userId;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    router.push(`/foodItems/${id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      router.push("/authentication/login");
      return;
    }

    if (userId) {
      const cartItem = {
        image: image,
        name: name,
        description: description,
        category: category,
        likes: 0,
        net_price: netPrice,
        quantity: 1,
      };
      dispatch(addItemToCart({ userId, item: cartItem }));
    }
  };

  return (
    <CardContainer onClick={handleClick} className="card">
      <div className="image-div">
        <Image src={image} alt={name} className="image" />
      </div>

      <div className="content-div">
        <Category className="category">{category !== "" && category}</Category>

        {discountAmount > 0 && (
          <Discount className="line-through discount">
            {discountAmount}%OFF
          </Discount>
        )}

        <Content className="content">
          <div
            className="main"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <Title className="title">{name}</Title>
            <Button className="addtocart" onClick={(e) => handleAddToCart(e)}>
              <LiaCartArrowDownSolid />
            </Button>
          </div>
          <p className="description"> {description} </p>
          <PriceSection className="price-section">
            {discountAmount > 0 && (
              <span className="line-through">${price}</span>
            )}
            {price > 0 && <span className="net_price">${netPrice}</span>}
          </PriceSection>
        </Content>
      </div>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 425px) {
    display: block;
  }
`;

const Category = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  color: #ffbc40;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Content = styled.div`
  .description {
    display: none;
  }
  padding: 1rem;
`;

const Discount = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px;
  background-color: rgb(210, 43, 43);
  border-radius: 10px;
  padding: 5px 10px;
  color: white;
  font-size: 14px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;
