import styled from "styled-components";

const Container = styled.div`
  border-radius: 0.75rem;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
 
  /* Custom Scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 12px; /* Width of the scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
    border-radius: 0.75rem; /* Track rounded corners */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Thumb color */
    border-radius: 0.75rem; /* Thumb rounded corners */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555; /* Thumb color on hover */
  }

  /* Custom Scrollbar for Firefox */
  scrollbar-width: thin; /* Make the scrollbar thin */
  scrollbar-color: #888 #f1f1f1; /* Thumb and track color */
`;

export default Container;
