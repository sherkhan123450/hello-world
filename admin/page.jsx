"use client";
import React, { useState } from "react";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";
import AdminContent from "../components/AdminComponents/AdminShowContent";
import styled from "styled-components";

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <AdminSidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <ContentWrapper>
        <Header>Admin</Header>

        <AdminContent page={currentPage} />
      </ContentWrapper>
    </Container>
  );
};

export default AdminPage;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
  width: 100%;
  background-color: #1f2937;
  color: white;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;

  @media (max-width: 425px) {
    width: 742px;
  }
`;

const ContentWrapper = styled.div`
  width: 80%;
  padding: 0;
  background-size: cover;
  background-position: center;

  @media (max-width: 425px) {
    width: 552px;
    overflow: auto;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;
