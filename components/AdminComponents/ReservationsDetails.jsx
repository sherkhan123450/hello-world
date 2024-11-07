import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getReservations,
  deleteReservation,
} from "@/app/store/slices/reservationSlice"; // Import the deleteReservation action
import styled from "styled-components";

const ReservationsDetails = () => {
  const dispatch = useDispatch();
  const { allReservations, getReservationsStatus } = useSelector(
    (state) => state.reservation
  );
  const [expandedRow, setExpandedRow] = useState(null);
  const [user, setUser] = useState(null);
  const { users, getUserStatus } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const toggleRow = (reservation) => {
    setExpandedRow((prev) =>
      prev?._id === reservation._id ? null : reservation
    );
  };

  const handleUserClick = (userId) => {
    const selectedUser = users.find((user) => user._id === userId);
    setUser(selectedUser);
    console.log(selectedUser, userId, users);
  };

  const handleDeleteReservation = (userId, reservationId) => {
    console.log(userId, reservationId, "handle delete in triger");
    dispatch(deleteReservation({ userId, reservationId })); // Call the delete action
  };

  const closeModal = () => {
    setExpandedRow(null);
    setUser(null); // Reset user state on modal close
  };

  return (
    <Container>
      <Title>Reservations Details</Title>

      {getReservationsStatus === "loading" && (
        <Message>Loading reservations...</Message>
      )}
      {getReservationsStatus === "failed" && (
        <Message>Failed to load reservations.</Message>
      )}
      {getReservationsStatus === "succeeded" &&
        allReservations.length === 0 && (
          <Message>No reservations found.</Message>
        )}

      {allReservations?.length > 0 && (
        <Table>
          <thead>
            <tr>
              <Th>Full Name</Th>
              <Th>Phone</Th>
              <Th>Party Date</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {allReservations.map((reservation) => (
              <Tr key={reservation._id}>
                <Td>{reservation.fullName}</Td>
                <Td>{reservation.phone}</Td>
                <Td>{new Date(reservation.partyDate).toLocaleDateString()}</Td>
                <Td>
                  <Button onClick={() => toggleRow(reservation)}>
                    {expandedRow?._id === reservation._id
                      ? "Hide Details"
                      : "Show Details"}
                  </Button>
                  <DeleteButton
                    onClick={() =>
                      handleDeleteReservation(
                        reservation.userId,
                        reservation._id
                      )
                    }
                  >
                    Delete
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      {expandedRow && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>Close</CloseButton>
            <h2>Reservation Details</h2>
            <p>
              <strong>FullName:</strong> {expandedRow.fullName}
            </p>
            <p>
              <strong>Pone Number:</strong> {expandedRow.phone}
            </p>
            <p>
              <strong>Email:</strong> {expandedRow.email}
            </p>
            <p>
              <strong>Party Date:</strong>{" "}
              {new Date(expandedRow.partyDate).toLocaleDateString()}
            </p>{" "}
            <p>
              <strong>Party Time:</strong> {expandedRow.partyTime}
            </p>
            <p>
              <strong>Party Type:</strong> {expandedRow.partyType}
            </p>
            <p>
              <strong>Table:</strong> {expandedRow.table}
            </p>
            <p>
              <strong>Package:</strong> {expandedRow.selectedPackages}
            </p>
            <p>
              <strong>Food Packages:</strong>
            </p>
            <ul>
              {expandedRow.foodPackages.map((packageItem, index) => (
                <li key={index}>{packageItem}</li>
              ))}
            </ul>
            <p>
              <strong>User ID:</strong>{" "}
              <UserIdLink onClick={() => handleUserClick(expandedRow.userId)}>
                {expandedRow.userId}
              </UserIdLink>
            </p>
            {/* Show user data after fetching */}
            {getUserStatus === "loading" && (
              <Message>Loading user data...</Message>
            )}
            {getUserStatus === "failed" && (
              <Message>Failed to load user data.</Message>
            )}
            {user && (
              <UserDetails>
                <h3>User Details</h3>
                <p>
                  <strong>Name :</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {user.address}
                </p>
                {/* Add more user details as needed */}
              </UserDetails>
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ReservationsDetails;

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 28px; /* Slightly larger title */
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center; /* Center align title */
  color: #2d3748; /* Darker text color */
`;

const Message = styled.p`
  margin: 8px 0;
  text-align: center; /* Center align messages */
  color: #4a5568; /* Darker message color */
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden; /* Rounded corners for table */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const Th = styled.th`
  background-color: #3182ce; /* Header background */
  color: white; /* Header text color */
  padding: 12px;
  font-weight: bold;
`;

const Tr = styled.tr`
  background-color: "#e6f7ff"; /* Highlighted row */
  &:hover {
    background-color: #f1f1f1; /* Hover effect */
  }
`;

const Td = styled.td`
  border: 1px solid #e2e8f0;
  padding: 12px; /* Increased padding for cells */
`;

const Button = styled.button`
  background-color: #3182ce;
  color: #fff;
  padding: 10px 16px; /* Increased button size */
  border: none;
  cursor: pointer;
  margin-right: 8px; /* Space between buttons */
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s; /* Add transform for effect */

  &:hover {
    background-color: #2b6cb0;
    transform: translateY(-1px); /* Lift effect on hover */
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e53e3e; /* Red for delete */

  &:hover {
    background-color: #c53030; /* Darker red */
  }
`;

/* Modal Styles */
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease; /* Smooth transition */
  animation: slide-in 0.3s ease; /* Animation for modal appearance */

  @keyframes slide-in {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  background-color: #3182ce; /* Use the same color scheme */
  color: #fff;
  padding: 10px 16px; /* Increased padding */
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 16px; /* Space below close button */
  transition: background-color 0.3s, transform 0.2s; /* Add transform for effect */

  &:hover {
    background-color: #2b6cb0;
    transform: translateY(-1px); /* Lift effect on hover */
  }
`;

const UserIdLink = styled.span`
  color: #3182ce;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const UserDetails = styled.div`
  margin-top: 16px;
  border-top: 1px solid #e2e8f0;
  padding-top: 12px;
`;
