import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchAllCurrentOrders,
  updateOrderStatus,
  completeOrder,
  deleteOrder
} from "@/app/store/slices/currentOrderSlice";
import { io } from "socket.io-client";

let socke = io();
function showLoadingCursor() {
  // Change the cursor to loading
  document.body.style.cursor = 'wait';

  // Set a timeout to revert the cursor back to default after 2 seconds
  setTimeout(() => {
    document.body.style.cursor = 'default';
  }, 2000);
}


const CurrentOrders = () => {
  const { addOrderStatus } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { currentOrders, statusUpdateStatus, deletedOrderStatus, currentOrdersStatus, error } = useSelector((state) => state.cOrders);
  const socketRef = useRef(socke);
  const socket = socketRef.current;
  const [disabledCrossButton, setdisabledCrossButton] = useState(false);


  useEffect(() => {

    const handleUpdateCurrentOrderPage = () => {
      showLoadingCursor()
      setdisabledCrossButton(true)
      setTimeout(() => {
        dispatch(fetchAllCurrentOrders());
        setdisabledCrossButton(false)
      }, 2000);

    };

    socket.on("updateCurrentOrderPage", handleUpdateCurrentOrderPage);

    return () => {
      socket.off("updateCurrentOrderPage", handleUpdateCurrentOrderPage);
      socket.off("connect");
    };
  }, [dispatch, statusUpdateStatus, deletedOrderStatus, addOrderStatus]);





  useEffect(() => {
    if (
      (currentOrders.length < 0 && error)

    ) {
      socket.emit("updateCurrentOrderPage");

    }
  }, [currentOrders, dispatch]);


  const handleStatusChange = (userId, orderId, currentStatus) => {
    socket.emit("updateUserIdFR", userId);
    // socket.on("connect", () => console.log("Socket connected:", socket.id));

    const statusMap = { Pending: "Active", Active: "Arrived", Arrived: "Pending" };
    const newStatus = statusMap[currentStatus];
    dispatch(updateOrderStatus({ userId, orderId, newStatus }));

    socket.emit("updateCurrentOrderPage");

  };

  const handleCompleteOrder = (userId, orderId) => {
    dispatch(completeOrder({ userId, orderId }));
    socket.emit("updateCurrentOrderPage");
  };

  const handleDeleteOrder = (userId, orderId) => {
    dispatch(deleteOrder({ userId, orderId }));
    socket.emit("updateCurrentOrderPage");

  };

  const filteredOrders = currentOrders.filter((order) =>
    order.orders.some((orderItem) => orderItem.items.length > 0)
  );

  if (currentOrdersStatus === "failed") {
    return <ErrorMessage>Error: {error?.message || "An error occurred"}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Current Orders</Title>
      {currentOrdersStatus === "loading" && (
        <LoadingMessage>Loading, please wait...</LoadingMessage>
      )}
      <Cards>
        {filteredOrders.map((order) => (
          <OrderCard key={order._id}>
            <CardContent>
              <OrderTitle>
                {order.profile.firstName}'s Order{" "}
                {order.isVerified ? "(V)" : "(UnV)"}
              </OrderTitle>
              {order.orders.map((orderItem) => {
                const { _id, createdAt, totalPrice, status, items, isCanceled } = orderItem;
                const orderTime = new Date(createdAt);
                const arrivalTime = new Date(orderTime.getTime() + 20 * 60000);

                return (
                  <OrderDetails key={_id}>
                    <p
                      style={{
                        width: '100%',
                        height: '10px',
                        backgroundColor: isCanceled ? 'red' : 'green',
                      }}
                    ></p>

                    {
                      isCanceled && <CloseButton
                        onClick={() => handleDeleteOrder(order.userId, _id)}
                        disabled={disabledCrossButton}
                        style={{ backgroundColor: disabledCrossButton ? 'grey' : 'white' }}>
                        ×
                      </CloseButton>
                    }
                    <ItemsTitle>Canceled: {isCanceled ? <span style={{ color: 'red' }}>YES</span> : <span style={{ color: 'green' }}>NO</span>}</ItemsTitle>
                    <ItemsTitle>Order Time</ItemsTitle>
                    <DetailText>OT: {orderTime.toLocaleString()}</DetailText>
                    <DetailText>AT: {arrivalTime.toLocaleString()}</DetailText>
                    <DetailText><strong>Items</strong></DetailText>

                    {items?.length > 0 ? (
                      <>
                        {items.map((item) => (
                          <ItemDetail key={item._id}>
                            <DetailText>
                              {item.name} - Quantity: {item.quantity}
                            </DetailText>
                            <DetailText>Price: ${item.net_price}</DetailText>
                          </ItemDetail>
                        ))}
                        <DetailText>Total Price: ${totalPrice}</DetailText>
                      </>
                    ) : (
                      <DetailText>No items in this order.</DetailText>
                    )}

                    <DetailText><strong>Status</strong></DetailText>
                    <StatusContainer onClick={() => handleStatusChange(order.userId, _id, status)}>
                      <StatusIndicator status={status} />
                      <StatusLabels>
                        <StatusLabel active={status === "Pending"}>Pending</StatusLabel>
                        <StatusLabel active={status === "Active"}>Active</StatusLabel>
                        <StatusLabel active={status === "Arrived"}>Arrived</StatusLabel>
                      </StatusLabels>
                    </StatusContainer>

                    {status === "Arrived" && (
                      <CompleteButton onClick={() => handleCompleteOrder(order.userId, _id)}>
                        Mark as Completed
                      </CompleteButton>
                    )}
                    <Separator />
                  </OrderDetails>
                );
              })}
              <DetailText>Shipping Address: {order.profile.address}</DetailText>
            </CardContent>
          </OrderCard>
        ))}
      </Cards>
    </Container>
  );
};

export default CurrentOrders;


const Container = styled.div`
  padding: 20px;
  background: #f8f9fa; /* Light background for contrast */
  margin-bottom: 100px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: bolder;
  text-decoration: underline;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Responsive columns */
  padding: 20px;
  gap: 16px; /* Space between cards */
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ensure cards fill their column */
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 35px;
  color: grey;
  cursor: pointer;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const OrderTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const ItemsTitle = styled.h4`
  margin: 10px 0;
  font-size: 1.2rem;
  color: #555;
`;

const OrderDetails = styled.div`
  position : relative ;
  margin-bottom: 16px;
`;

const DetailText = styled.p`
  margin: 4px 0;
  color: #666;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
`;

const StatusIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !["status"].includes(prop), // Prevents `status` from being forwarded
})`
  width: 40px;
  height: 20px;
  background-color: ${({ status }) =>
    status === "Pending"
      ? "#6c63ff"
      : status === "Active"
        ? "#28a745"
        : "#007bff"};
  border-radius: 10px;
  transition: background-color 0.3s;
`;

const StatusLabels = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
`;

const StatusLabel = styled.span.withConfig({
  shouldForwardProp: (prop) => !["active"].includes(prop), // Prevents `status` from being forwarded
})`
  color: ${({ active }) => (active ? "#000" : "#999")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;

const ItemDetail = styled.div`
  margin: 8px 0;
`;

const CompleteButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #ddd;
  margin: 10px 0;
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bolder;
  text-align: center;
  font-size: 1.5rem;
  color: #fbceb1;
  padding: 20px;
  transform: translate(-50%, -50%); /* Center the loading message */
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 1.2rem;
`;
