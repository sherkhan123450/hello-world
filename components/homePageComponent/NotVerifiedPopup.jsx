'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from '../ButtonComponent';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NotVerifiedPopup = () => {
    const route = useRouter();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [isPopupVisible, setIsPopupVisible] = useState(true);

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };


    const renderPopupContent = () => {
        if (!isAuthenticated) {
            return (
                <>
                    <Title>Please Sign In</Title>
                    <Description>You need to be signed in to verify your number and access all features.</Description>
                    <ButtonWrapper>
                        <Link href='authentication/registration'>

                            <Button>Sign In</Button>
                        </Link>
                        <Button onClick={handleClosePopup}>Remind Me Later</Button>
                    </ButtonWrapper>
                </>
            );
        }

        if (isAuthenticated && !user.isVerified) {
            return (
                <>
                    <Title>User Number Is Not Verified</Title>
                    <Description>Please verify your number to access all features.</Description>
                    <ButtonWrapper>
                        <Link href='authentication/phoneVerification'>

                            <Button>Verify</Button>
                        </Link>
                        <Button onClick={handleClosePopup}>Remind Me Later</Button>
                    </ButtonWrapper>
                </>
            );
        }

        return null; // No content to display
    };

    return (
        <>
            {isPopupVisible && (
                <Wrapper>
                    <Content>
                        {renderPopupContent()}
                    </Content>
                </Wrapper>
            )}
        </>
    );
};

export default NotVerifiedPopup;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Content = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h2`
  color: #ff5555;
  margin-bottom: 10px;
  font-size: 1.8rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
