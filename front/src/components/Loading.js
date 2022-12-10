import styled from 'styled-components';
function Loading() {
  return (
    <StyledDiv>
      <StyledText>로딩중...</StyledText>
      <img src="/spinner"></img>
    </StyledDiv>
  );
}

export default Loading;

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled.div`
  text-align: center;
`;
