import { useEffect } from 'react';

import styled from 'styled-components';
function Loading() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <StyledDiv>
      <img src="/Spinner.gif" alt="로딩"></img>
    </StyledDiv>
  );
}

export default Loading;

const StyledDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
