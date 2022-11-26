import styled from 'styled-components';

function StartSell() {
   return (
      <StyledWrapper>
         <StyledP>
            여행 후 남은 동전을 <strong>4단계</strong>로 손쉽게 판매해 보세요!
         </StyledP>
      </StyledWrapper>
   );
}

export default StartSell;

const StyledWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 300px;
`;

const StyledP = styled.p`
   font-size: 21px;
`;
