"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllUsers,
  adminToggle,
  deleteUser,
} from "@/app/store/slices/getUsersSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    if (users.length === 0 || error) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch]);

  const handleAdminToggle = async (userId) => {
    try {
      await dispatch(adminToggle(userId));
      toast.success("Admin status updated successfully!");
    } catch (err) {
      toast.error("Error toggling admin status");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchUsername.toLowerCase()) &&
        user.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Container>
      <Title>User Management</Title>

      <SearchContainer>
        <TextField
          type="text"
          placeholder="Search by Username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </SearchContainer>

      {status === "loading" && (
        <LoadingMessage>Loading users...</LoadingMessage>
      )}
      {error && <ErrorMessage>Failed to fetch users: {error}</ErrorMessage>}
      {status !== "loading" && filteredUsers.length === 0 && !error && (
        <NoUsersMessage>No users found.</NoUsersMessage>
      )}

      {status !== "loading" && filteredUsers.length > 0 && (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Username</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Address</TableHeader>
              <TableHeader>Is Admin</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell className="admin-yes-no">
                  {user.isAdmin ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <ButtonGroup>
                    <AdminButton
                      isAdmin={user.isAdmin}
                      onClick={() => handleAdminToggle(user._id)}
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </AdminButton>
                    <DeleteButton onClick={() => handleDeleteUser(user._id)}>
                      Delete User
                    </DeleteButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
  .admin-yes-no {
    font-weight: bolder;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.p`
  color: #007bff;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const NoUsersMessage = styled.p`
  margin-top: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  background-color: #e0e0e0;
  padding: 10px;
  text-align: left;
  color: #1f2937;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  color: #555;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    opacity: 0.9;
  }
`;

const AdminButton = styled(Button).attrs({ isAdmin: undefined })`
  background-color: ${(props) => (props.isAdmin ? "#1f2937" : "transparent")};
  color: ${(props) => (props.isAdmin ? "white" : "#1f2937")};
  border: ${(props) => (props.isAdmin ? "none" : "1px solid #1f2937")};
`;

const DeleteButton = styled(Button)`
  background-color: #1f2937;
  color: white;
`;

const TextField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;
