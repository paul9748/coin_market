import styled from 'styled-components';

import penguin from 'assets/images/penguin.png';

function StartSell() {
  return (
    <StyledWrapper>
      <StyledImg src={penguin}></StyledImg>
      <StyledP>
        여행 후 남은 동전을 <strong>4단계</strong>로 손쉽게 판매해 보세요!
      </StyledP>
    </StyledWrapper>
  );
}

export default StartSell;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const StyledImg = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const StyledP = styled.p`
  font-size: 28px;
  text-align: center;
`;
