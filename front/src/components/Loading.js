import styled from 'styled-components';
function Loading() {
  return (
    <StyledDiv>
      <img src="/spinner.gif" alt="로딩"></img>
    </StyledDiv>
  );
}

export default Loading;

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 170vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
