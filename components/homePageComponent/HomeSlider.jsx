"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HomeSliderSkeleton from "../loading/HomeSliderSkeleton";
import { fetchPackages } from "@/app/store/slices/packageSlice";
import { addItemToCart } from "@/app/store/slices/cartSlice";
import styled from "styled-components";
import { Button } from "@/app/components/ButtonComponent";

const HomeSlider = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { createError, createStatus: status } = useSelector(
    (state) => state.cart
  );
  const { packages, fetchStatus, error } = useSelector(
    (state) => state.package
  );
  const userId = useSelector((state) => state.auth.user?.userId);

  useEffect(() => {
    if (packages.length === 0 || error) {
      dispatch(fetchPackages());
    }
    if (createError) {
      alert("try again and check the internate connect");
    }
  }, [dispatch]);

  useEffect(() => {
    if (packages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === packages.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [packages]);

  const handleAddToCart = (productItem) => {
    console.log(userId)
    if (!userId) router.push("/authentication/login");
    if (productItem && userId) {
      const cartItem = {
        name: productItem.name,
        description: productItem.description,
        net_price: productItem.totalPrice,
        quantity: 1,
        category: "nn",
        likes: 0,
        image: "nn",
        package: true,
      };

      dispatch(addItemToCart({ userId, item: cartItem }));
    }
  };

  if (fetchStatus === "loading" || fetchStatus === "failed")
    return <HomeSliderSkeleton />;

  return (
    <SliderContainer>
      <SliderWrapper currentIndex={currentIndex}>
        {packages.map((item, index) => (
          <Slide key={item._id}>
            <Image
              src={item.image}
              alt={`Slide ${index + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <Overlay>
              <ItemsList className="items-list">
                {item.items.map((it, idx) => (
                  <div key={idx}>{it.name}</div>
                ))}
              </ItemsList>

              <CenterSection className="center-section">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <Button
                  style={{ backgroundColor: "transparent" }}
                  onClick={() => handleAddToCart(item)}
                >
                  {status === "loading" ? "Adding..." : "Add to Cart"}
                </Button>
              </CenterSection>

              <PriceCircle className="price-tag">
                <span>
                  Only <br /> ${item.totalPrice}
                </span>
              </PriceCircle>
            </Overlay>
          </Slide>
        ))}
      </SliderWrapper>

      <NavButton
        left
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? packages.length - 1 : prevIndex - 1
          )
        }
      >
        &lt;
      </NavButton>
      <NavButton
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === packages.length - 1 ? 0 : prevIndex + 1
          )
        }
      >
        &gt;
      </NavButton>

      <DotsContainer>
        {packages.map((_, index) => (
          <Dot
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
};

export default HomeSlider;

// Styled components

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const SliderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !["currentIndex"].includes(prop), // Prevent 'currentIndex' from being forwarded to the DOM
})`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const Slide = styled.div`
  min-width: 100%;
  height: 60vh;
  position: relative;

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 5vw;

  @media (max-width: 768px) {
    padding: 0;
    flex-direction: row;
    align-items: center;
    text-align: center;
    transform: scale(0.8);
  }

  @media (max-width: 425px) {
    transform: scale(1);

    .items-list {
      transform: scale(0.6);
      font-size: 8px;
    }

    .center-section {
      h2 {
        font-size: 2rem;
      }
      transform: scale(0.6);
    }

    .price-tag {
      transform: scale(0.6);
    }
  }
`;

const ItemsList = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;

  & > div {
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #ffbc40;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const CenterSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #ffbc40;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  button {
    border: 1px solid #ffbc40;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    color: #ffbc40;

    &:hover {
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.875rem;
    }

    button {
      font-size: 0.875rem;
    }
  }
`;

const PriceCircle = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: bottom;
  align-self: flex-end;

  span {
    width: min-content;
    height: min-content;
    padding: 20px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;
const NavButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["left"].includes(prop), // Prevent 'left' from being forwarded
})`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  width: 6vw;
  height: 6vw;
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  left: ${(props) => (props.left ? "1rem" : "auto")};
  right: ${(props) => (props.left ? "auto" : "1rem")};
`;

const Dot = styled.button.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop), // Prevent 'active' from being forwarded to the DOM
})`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "black" : "gray")};
  cursor: pointer;
  margin: 0 5px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;
