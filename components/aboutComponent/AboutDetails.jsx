'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import RestaurantPage from './RestaurantPage';
import StaffPage from './StaffPage';
import CookingPage from './CookingPage';
import CleaningPage from './CleaningPage';
import UseFoodPage from './UseFoodPage';
import ReservationPage from './ReservationPage';


const About = () => {
    const activeSection = useSelector((state) => state.about.activeSection);

    const renderContent = () => {
        switch (activeSection) {
            case 'restaurant':
                return <RestaurantPage />;
            case 'staff':
                return <StaffPage />;
            case 'cooking':
                return <CookingPage />;
            case 'cleaning':
                return <CleaningPage />;
            case 'useFood':
                return <UseFoodPage />;
            case 'reservation':
                return <ReservationPage />;
            default:
                return null;
        }
    };

    return (
        <Container>
            {renderContent()}
        </Container>
    );
};

export default About;


// Styled component for the container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;