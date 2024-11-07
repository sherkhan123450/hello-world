"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { getSingleFoodItem } from "@/app/store/slices/getSetFoodItemsSlice";
import { addItemToCart, fetchCartItems } from "@/app/store/slices/cartSlice";
import { Button } from "@/app/components/ButtonComponent";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import ProductPageSkeleton from "@/app/components/loading/PrductSkeleton";
import { FaSpinner } from "react-icons/fa";

const ProductPage = ({ params }) => {
  const dispatch = useDispatch();
  const id = params?.id;
  const productItem = useSelector((state) => state.foodItems.singleFoodItem);
  const singleDataStatus = useSelector(
    (state) => state.foodItems.singleDataStatus
  );
  const { createStatus } = useSelector((state) => state.cart);
  const error = useSelector((state) => state.foodItems.error);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const [hasFetched, setHasFetched] = useState(false);
  const userId = user?.userId;

  // Fetch cart items when item is added successfully
  useEffect(() => {
    if (createStatus === "succeeded" && !hasFetched) {
      dispatch(fetchCartItems(user.userId));
      setHasFetched(true);
    }
  }, [createStatus]);

  // Fetch single product item
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(getSingleFoodItem(id)).unwrap();
        } catch (err) {
          console.error("Failed to fetch food item:", err.message);
          router.push("/404");
        }
      }
    };
    fetchData();
  }, [id, dispatch, router]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user) {
      router.push("authentication/login");
      return;
    }

    if (productItem && userId) {
      const cartItem = {
        image: productItem.image,
        name: productItem.name,
        description: productItem.description,
        category: productItem.category,
        likes: productItem.likes,
        net_price: productItem.net_price,
        quantity: 1,
      };

      if (singleDataStatus === "succeeded") {
        dispatch(addItemToCart({ userId, item: cartItem }));
      }
    }
  };
  if (singleDataStatus === "idle") {
    return <ProductPageSkeleton />;
  }

  if (singleDataStatus === "failed") {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <h1>{singleDataStatus === "loading" ? <Spinner /> : ""}</h1>
      <ProductCard>
        {singleDataStatus === "succeeded" ? (
          <>
            {productItem.discountPercentage > 0 && (
              <DiscountBadge className="discount">
                <span>O</span>
                <span>F</span>
                <span>F</span>

                <span className="line">{productItem.discountPercentage}%</span>
              </DiscountBadge>
            )}
            <ImageContainer>
              {productItem.image && (
                <ProductImage src={productItem.image} alt={productItem.name} />
              )}
            </ImageContainer>
            <DetailsContainer className="details">
              <Title>{productItem.name}</Title>
              <Category>Category : {productItem.category}</Category>
              <Description>description : {productItem.description}</Description>
              <Price className={productItem.discountPercentage > 0 && "line"}>
                Price : $ {productItem.price}
              </Price>
              <NetPrice>Net Price : ${productItem.net_price}</NetPrice>
              <ButtonDiv>
                <Button
                  className="button"
                  onClick={user ? handleAddToCart : () => router.push("/login")}
                >
                  {createStatus === "loading" ? "Adding..." : "Add to Cart"}
                  <LiaCartArrowDownSolid />
                </Button>
              </ButtonDiv>
            </DetailsContainer>
          </>
        ) : (
          <ProductPageSkeleton />
        )}
      </ProductCard>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1440px) {
    width: 80vw;
  }
  @media (max-width: 1024px) {
    width: 96vw;
  }

  @media (max-width: 425px) {
    width: 100vw;
    padding: 10px;
    margin: 10px auto;
  }
  .line {
    text-decoration: line-through;
  }
  .button {
    position: absolute;
    bottom: 40px;
    right: 40px;
  }

  @media (max-width: 320px) {
    .button {
      margin-top: 20px;
    }
  }
`;

const ProductCard = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: #fff;

  @media (max-width: 425px) {
    flex-direction: column;
    align-items: center;
    padding: 0;

    .discount {
      top: 2%;
      right: 10%;
      font-weight: bold;
    }
    .details {
      gap: 0.5rem;
      margin-bottom: 2em;
    }
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 25px;
  right: 5%;
  height: 100px;
  width: 60px;
  background-color: #d9534f;
  color: #fff;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  height: 400px;
  max-width: 400px;
  margin-right: 20px;
  flex: 1;

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 425px) {
    width: 100%;
    margin-right: 0;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 1rem;
  @media (max-width: 768px) {
    gap: 0rem;
  }
  @media (max-width: 425px) {
    padding: 20px 10px 10px 10px;
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: #ffbc40;
`;

const Category = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const NetPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
`;

const Error = styled.div`
  font-size: 1.2rem;
  color: red;
  text-align: center;
  margin-top: 20px;
`;
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f9f9f9; /* Light background for contrast */
`;

const LoadingText = styled.h1`
  font-size: 2rem;
  color: #ffbc40; /* Using your existing theme color */
  margin-top: 20px;
  font-weight: bold;
`;

const Spinner = styled(FaSpinner)`
  font-size: 3rem; /* Size of the spinner */
  color: #d9534f; /* Color of the spinner */
  animation: spin 1s infinite linear; /* Spin animation */

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default ProductPage;
