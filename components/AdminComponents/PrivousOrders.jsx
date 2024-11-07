import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPreviousOrders,
  deletePreviousOrder,
  deleteAllPreviousOrders,
} from "@/app/store/slices/previousOrderSlice";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const PreviousOrdersPage = () => {
  const dispatch = useDispatch();
  const { previousOrders, previousOrdersStatus } = useSelector(
    (state) => state.pOrders
  );

  useEffect(() => {
    dispatch(fetchAllPreviousOrders());
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deletePreviousOrder(orderId)); // Simplified payload
  };

  const handleDeleteAllOrders = () => {
    dispatch(deleteAllPreviousOrders());
  };

  if (previousOrdersStatus === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <Title>Previous Orders</Title>
      <OrdersGrid>
        {previousOrders?.map((order, index) => (
          <OrderCard key={order._id}>
            <CardContent>
              <OrderTitle>
                {order.firstName} {order.lastName}
              </OrderTitle>
              <OrderText>Phone: {order.phoneNumber}</OrderText>
              <OrderText>Email: {order.email}</OrderText>
              <OrderText>Shipping Address: {order.address}</OrderText>
              <OrderText>Status: {order.status}</OrderText>
              <OrderText>
                Total Price: ${order.order.totalPrice.toFixed(2)}
              </OrderText>
              <ItemsContainer>
                <ItemsTitle>Items:</ItemsTitle>
                {order.order.items.map((item) => (
                  <ItemBox key={uuidv4()}>
                    <OrderText>
                      {item.name} - Qty: {item.quantity} - $
                      {item.net_price.toFixed(2)}
                    </OrderText>
                  </ItemBox>
                ))}
              </ItemsContainer>
            </CardContent>
            <DeleteButton onClick={() => handleDeleteOrder(order._id)}>
              X
            </DeleteButton>
          </OrderCard>
        ))}
      </OrdersGrid>
      <DeleteAllButton onClick={handleDeleteAllOrders}>
        Delete All Previous Orders
      </DeleteAllButton>
    </PageContainer>
  );
};

export default PreviousOrdersPage;

// Styled Components
const PageContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const OrdersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const OrderCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  padding: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OrderTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const OrderText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const ItemsContainer = styled.div`
  margin-top: 0.75rem;
  padding-left: 1rem;
`;

const ItemsTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

const ItemBox = styled.div`
  margin-left: 1rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: darkred;
  }
`;

const DeleteAllButton = styled.button`
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  &:hover {
    background-color: #cc0000;
  }
`;
