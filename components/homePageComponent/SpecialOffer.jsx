"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getSpecialOffer } from "@/app/store/slices/getSetFoodItemsSlice";
import { addItemToCart } from "@/app/store/slices/cartSlice"; // Import the addItemToCart action
import SpecialOfferSkeleton from "../loading/SpecialOfferSkeleton"; // Import the Skeleton Loader
import styled from "styled-components";
import { Button } from "@/app/components/ButtonComponent";
import { useRouter } from "next/navigation";

const SpecialOffer = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const specialOffer = useSelector((state) => state.foodItems.specialOffer);
  const status = useSelector((state) => state.foodItems.fetchStatus);
  const user = useSelector((state) => state.auth.user); // Assume you have userId from auth slice
  const userId = user?.userId;
  useEffect(() => {
    if (status === "succeeded" && !specialOffer) {
      dispatch(getSpecialOffer());
    }
  }, [dispatch, status]);

  // Handle add to cart
  const handleAddToCart = async (productItem) => {
    if (!userId) router.push("/authentication/login");

    if (productItem && user.userId) {
      try {
        let userId = user.userId;
        await dispatch(addItemToCart({ userId, item: productItem })).unwrap();
      } catch (err) {
        console.error("Failed to add item to cart:", err.message);
      }
    } else {
      console.warn("User is not authenticated or product item is missing.");
    }
  };

  if (status === "loading" || status === "idle")
    return <SpecialOfferSkeleton />;
  if (status === "failed")
    return (
      <p className="text-center text-red-500">Error loading special offer</p>
    );

  return (
    <Container>
      <div className="container mx-auto px-4">
        {specialOffer && (
          <CardWrapper>
            <ImageWrapper>
              <ImageB
                src={
                  specialOffer?.image
                    ? specialOffer.image
                    : "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D"
                }
                alt={specialOffer?.name ? specialOffer.name : "Default Image"}
                width={300}
                height={200}
                style={{ objectFit: "cover" }}
              />
            </ImageWrapper>
            <DiscountPercentage>
              {specialOffer.discountPercentage}%
            </DiscountPercentage>{" "}
            <ContentWrapper>
              <Name>{specialOffer.name}</Name>
              <p className="text-lg text-gray-600 mb-2">
                Category:{" "}
                <span className="font-medium">{specialOffer.category}</span>
              </p>
              <Description>
                Description:{" "}
                <span className="font-medium">{specialOffer.description}</span>
              </Description>
              <OriginalPrice>
                Price:{" "}
                <span className="font-medium">${specialOffer.price}</span>
              </OriginalPrice>
              <Price>
                Total Price:{" "}
                <span className="font-medium">${specialOffer.net_price}</span>
              </Price>
              <AddToCartButton onClick={() => handleAddToCart(specialOffer)}>
                Add to Cart
              </AddToCartButton>
            </ContentWrapper>
          </CardWrapper>
        )}
      </div>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  background-color: #f5f5f5; // Background color for the section
  padding: 2rem 0;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row; // Default: Row layout
  max-height: 400px; // Max height for the card
  background-color: #ffffff; // Background color for the card
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative; // Needed for discount badge positioning

  @media (max-width: 425px) {
    max-height: none;
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 400px; // Max width for the image
  height: 100%;
  position: relative;
  overflow: hidden; // Ensure image doesn't overflow its container
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageB = styled(Image)`
  width: 400px;
  height: 300px;
  margin: 0 auto;
`;
const ContentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; // Make sure it takes up remaining space
  height: 100%;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ff6347; // Discount badge background color
  color: white;
  border-radius: 50%;
  width: 3rem; // Adjust size as needed
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem; // Adjust font size as needed
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Optional shadow for better visibility

  @media (max-width: 425px) {
    position: relative; // Adjust positioning for smaller screens
    border-radius: 0%; // Adjust border radius for smaller screens
  }
`;

const DiscountPercentage = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ff6347; // Background color for discount percentage
  color: white;
  border-radius: 50%;
  width: 6rem; // Larger size
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem; // Larger font size
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); // Optional shadow for better visibility
  text-align: center;

  @media (max-width: 425px) {
    position: relative; // Adjust positioning for smaller screens
    border-radius: 0%;
    width: 10rem;
    height: 3rem;
    display: block;
  }
`;

const AddToCartButton = styled(Button)`
  // Conditional color based on active

  position: absolute;
  bottom: 1rem;
  right: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Name = styled.p`
  font-size: 1.875rem; // 3xl
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

const Price = styled.p`
  font-size: 1.125rem; // Larger than normal
  color: #ff6347; // Highlighted color
  margin-bottom: 0.5rem;
`;

const OriginalPrice = styled.p`
  font-size: 1rem;
  color: #999;
  margin-right: 0.5rem;
  span {
    text-decoration: line-through;
  }
`;

export default SpecialOffer;
