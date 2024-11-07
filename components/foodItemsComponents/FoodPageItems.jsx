"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFoodItems,
  filterItems,
} from "@/app/store/slices/getSetFoodItemsSlice";
import styled from "styled-components";
import Card from "../Card";

const FoodPageItems = () => {
  const dispatch = useDispatch();
  const { filteredItems, view, fetchStatus, items } = useSelector(
    (state) => state.foodItems
  );

  useEffect(() => {
    if (fetchStatus === "idle" && items.length === 0) {
      dispatch(fetchAllFoodItems());
    } else if (fetchStatus === "failed") {
      console.error("Failed to fetch items");
    }
  }, [dispatch, fetchStatus, items]);

  useEffect(() => {
    if (fetchStatus === "succeeded") {
      dispatch(filterItems()); // Dispatch filterItems only when fetch succeeds
    }
  }, [dispatch, fetchStatus, items]);

  const renderSkeleton = () => {
    return (
      <Container className={`grid ${view}`}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <SkeletonItem key={index}>
              <SkeletonImage />
              <SkeletonText />
              <SkeletonText />
              {view === "grid" && <SkeletonText />}
            </SkeletonItem>
          ))}
      </Container>
    );
  };

  if (fetchStatus === "loading") {
    return renderSkeleton();
  }

  if (fetchStatus === "failed") {
    return <p className="text-center col-span-full">Failed to fetch items.</p>;
  }

  return (
    <Container className={view}>
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Card
            className="card"
            key={item._id}
            name={item.name}
            image={item.image}
            id={item._id}
            category={item.category}
            description={item.description}
            netPrice={item.net_price}
            discountAmount={item.discountPercentage}
            price={item.price}
          />
        ))
      ) : (
        <p className="text-center col-span-full">No items found.</p>
      )}
    </Container>
  );
};

export default FoodPageItems;

// Styled components
const Container = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem 2rem;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(3, 1fr)" : "1fr"};

  &.grid {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 425px) {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: ${({ view }) =>
      view === "grid" ? "repeat(2, 1fr)" : "1fr"};
  }
  @media (min-width: 1024px) {
    width: 80%;
    margin: 0 auto;
  }

  &.list {
    grid-template-columns: 1fr;
    .card {
      display: flex;
      height: 200px;
      gap: 1rem;

      .content-div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
      }

      .image {
        width: 45%;
        min-width: 300px;
        height: 100%;
      }
      .net_price,
      .price-section {
        display: block !important;
      }
      .discription {
        display: block;
      }
      .category {
        position: relative;
        border: 1px solid white;
        border-radius: 0;
        width: max-content;
        padding: 5px 10px;
        color: white;
        background-color: #ffbc40;
        margin: 0;
      }

      .content {
        padding: 0;
      }

      .addtocart {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100px;
        height: 100px;
        position: absolute;
        left: 90%;
        top: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.25rem;
        padding: 0;
        margin: 0;
        font-weight: bolder;
      }
    }
  }
`;

const SkeletonItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #edf2f7;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #edf2f7;
    }
    50% {
      background-color: #e2e8f0;
    }
    100% {
      background-color: #edf2f7;
    }
  }
`;

const SkeletonImage = styled.div`
  height: 10rem;
  background-color: #cbd5e0;
  margin-bottom: 1rem;
`;

const SkeletonText = styled.div`
  height: 1rem;
  background-color: #cbd5e0;
  margin-bottom: 0.5rem;
`;

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
