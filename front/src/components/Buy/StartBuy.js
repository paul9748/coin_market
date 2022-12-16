import styled from 'styled-components';

import machine from 'assets/images/machine_image.png';

function StartBuy() {
  return (
    <StyledWrapper>
      <StyledImg src={machine}></StyledImg>
      <StyledP>
        필요한 동전을 손쉽게 <strong>구매</strong>해 보세요!
      </StyledP>
    </StyledWrapper>
  );
}

export default StartBuy;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const StyledImg = styled.img`
  width: 200px;
  margin-bottom: 20px;
`;

const StyledP = styled.p`
  font-size: 28px;
  text-align: center;

  @media (max-width: 500px) {
    font-size: 23px;
  }
  @media (max-width: 420px) {
    font-size: 20px;
  }
`;
