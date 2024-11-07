import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ isError }) => (isError ? 'red' : 'green')};
`;

const PhoneVerification = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const sendOtp = async () => {
        try {
            const response = await axios.post('/api/send-otp', { phoneNumber });
            if (response.data.status === 'pending') {
                setIsOtpSent(true);
                setMessage('OTP sent! Please check your phone.');
                setIsError(false);
            }
        } catch (error) {
            setMessage('Failed to send OTP.');
            setIsError(true);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('/api/verify-otp', { phoneNumber, code: otp });
            if (response.data.message) {
                setMessage(response.data.message);
                setIsError(false);
            } else {
                setMessage('Verification failed. Please try again.');
                setIsError(true);
            }
        } catch (error) {
            setMessage('Verification error.');
            setIsError(true);
        }
    };

    return (
        <Container>
            <Title>Phone Verification</Title>
            <Input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button onClick={sendOtp} disabled={!phoneNumber}>
                Send OTP
            </Button>

            {isOtpSent && (
                <>
                    <Input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <Button onClick={verifyOtp} disabled={!otp}>
                        Verify OTP
                    </Button>
                </>
            )}

            {message && <Message isError={isError}>{message}</Message>}
        </Container>
    );
};

export default PhoneVerification;
