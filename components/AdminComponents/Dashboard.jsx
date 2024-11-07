import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPreviousOrders } from "@/app/store/slices/previousOrderSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";
import {
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaClipboardCheck,
} from "react-icons/fa";
import UsersChart from "@/app/components/AdminComponents/UsersChart";
import { fetchAllUsers } from "@/app/store/slices/getUsersSlice";
import { fetchAllCurrentOrders } from "@/app/store/slices/currentOrderSlice";
import { fetchAllFoodItems } from "@/app/store/slices/getSetFoodItemsSlice";
import { fetchPackages } from "@/app/store/slices/packageSlice";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    previousOrdersStatus,
    previousOrdersLength,
    allPreviousOrdersTotalIncome,
    OrdersAndQuantity,
  } = useSelector((state) => state.pOrders);

  const { items, fetchStatus: foodItemsFetchStatus } = useSelector(
    (state) => state.foodItems
  );
  const { packages, fetchStatus: packageFetchStatus } = useSelector(
    (state) => state.package
  );
  const uniqueItems = useSelector((state) => state.pOrders.OrdersAndQuantity);
  const {
    users,
    status: getUsersStatus,
    admins,
    isVerified,
    notVerified,
  } = useSelector((state) => state.users);
  const { currentOrdersStatus, activeCurrentOrders, pendingCurrentOrders } =
    useSelector((state) => state.cOrders);

  useEffect(() => {
    if (foodItemsFetchStatus !== "succeeded") {
      dispatch(fetchAllFoodItems());
    }
    if (packageFetchStatus !== "succeeded") {
      dispatch(fetchPackages());
    }
    if (previousOrdersStatus !== "succeeded") {
      dispatch(fetchAllPreviousOrders());
    }
    if (currentOrdersStatus !== "succeeded") {
      dispatch(fetchAllCurrentOrders());
    }
    if (users.length === 0 && getUsersStatus !== "succeeded") {
      dispatch(fetchAllUsers());
    }
  }, [
    dispatch,
    foodItemsFetchStatus,
    packageFetchStatus,
    previousOrdersStatus,
    currentOrdersStatus,
    users,
    getUsersStatus,
  ]);

  return (
    <Container>
      <Grid>
        <Card color="#ffcccb">
          <CardIcon>
            <FaClipboardList size={30} />
          </CardIcon>
          <CardTitle>Active Orders</CardTitle>
          <CardValue>{activeCurrentOrders.length}</CardValue>
        </Card>
        <Card color="#ffebcd">
          <CardIcon>
            <FaClipboardCheck size={30} />
          </CardIcon>
          <CardTitle>Pending Orders</CardTitle>
          <CardValue>{pendingCurrentOrders.length}</CardValue>
        </Card>
        <Card color="#add8e6">
          <CardIcon>
            <FaUsers size={30} />
          </CardIcon>
          <CardTitle>Arrived Orders</CardTitle>
          <CardValue color="blue">
            {previousOrdersStatus === "succeeded"
              ? previousOrdersLength
              : "Loading..."}
          </CardValue>
        </Card>
        <Card color="#90ee90">
          <CardIcon>
            <FaDollarSign size={30} />
          </CardIcon>
          <CardTitle>Total Income</CardTitle>
          <CardValue color="green">
            {previousOrdersStatus === "succeeded"
              ? `$${allPreviousOrdersTotalIncome.toFixed(2)}`
              : "Loading..."}
          </CardValue>
        </Card>
      </Grid>
      <ChartGrid>
        <TableWrapper>
          <p>Total Food Items: {items.length}</p>
          <p>Total Packages: {packages.length}</p>
          <Table>
            <thead>
              <tr>
                <TableHeader>Item Name</TableHeader>
                <TableHeader>Quantity</TableHeader>
              </tr>
            </thead>
            <tbody>
              {uniqueItems?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <UserStats>
          <Card color="#ffb6c1">
            <CardTitle>Total Users</CardTitle>
            <CardValue color="blue">
              {getUsersStatus === "succeeded" ? users.length : "Loading..."}
            </CardValue>
          </Card>
          <Card color="#ffb6c1">
            <CardTitle>Total Admins</CardTitle>
            <CardValue color="blue">
              {getUsersStatus === "succeeded" ? admins : "Loading..."}
            </CardValue>
          </Card>
          <Card color="#ffb6c1">
            <CardTitle>Verified Users</CardTitle>
            <CardValue color="blue">
              {getUsersStatus === "succeeded" ? isVerified : "Loading..."}
            </CardValue>
          </Card>
          <Card color="#ffb6c1">
            <CardTitle>Not-Verified Users</CardTitle>
            <CardValue color="blue">
              {getUsersStatus === "succeeded" ? notVerified : "Loading..."}
            </CardValue>
          </Card>
        </UserStats>
      </ChartGrid>
      <ChartGrid>
        {/* <ChartWrapper style={{ maxWidth: "50%" }}>
          <UsersChart className="users-chart" />
        </ChartWrapper> */}
      </ChartGrid>
    </Container>
  );
};

export default Dashboard;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #f7f9fc;
  border-radius: 0.75rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UserStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.color || "#ffffff"};
  padding: 1rem;
  border-radius: 0.75rem;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;

const CardValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => (props.color === "blue" ? "#2563eb" : "#10b981")};
`;

const CardIcon = styled.div`
  margin-bottom: 10px;
  color: #374151;
`;

const ChartWrapper = styled.div`
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 0.75rem;
`;

const Table = styled.table`
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  color: #374151;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  color: #4b5563;
`;
