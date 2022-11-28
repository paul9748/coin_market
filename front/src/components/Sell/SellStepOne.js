import styled from 'styled-components';
import correctExample from 'assets/images/coin_example.jpg';
import wrongExample1 from 'assets/images/coin_example2.png';
import wrongExample2 from 'assets/images/coin_example3.png';

function SellStepOne() {
  return (
    <StyledWrapper>
      <StyledDiv>
        <StyledTitle>
          <StyledMark color="blue">O</StyledMark>올바른 사진 예시
        </StyledTitle>
        <StyledImgWrapper>
          <StyledImgDiv>
            <StyledCorrectImg src={correctExample}></StyledCorrectImg>
            <StyledP>어두운 바닥에 동전을 겹치지 않게 배치해주세요</StyledP>
          </StyledImgDiv>
        </StyledImgWrapper>
      </StyledDiv>
      <StyledDiv>
        <StyledTitle>
          <StyledMark color="red">X</StyledMark>잘못된 사진 예시
        </StyledTitle>
        <StyledImgWrapper>
          <StyledImgDiv>
            <StyledWrongImg src={wrongExample1}></StyledWrongImg>
            <StyledP>동전끼리 겹쳐짐</StyledP>
          </StyledImgDiv>
          <StyledImgDiv>
            <StyledWrongImg src={wrongExample2}></StyledWrongImg>
            <StyledP>동전을 쌓아둠</StyledP>
          </StyledImgDiv>
        </StyledImgWrapper>
      </StyledDiv>
    </StyledWrapper>
  );
}

export default SellStepOne;

const StyledWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-left: 20px;
  }

  @media (max-width: 700px) {
    margin-top: 30px;
    & + & {
      margin-left: 0;
    }
  }
`;

const StyledMark = styled.span`
  color: ${(props) => props.color};
  font-size: 60px;
  font-weight: bold;
  opacity: 0.6;
  margin-right: 15px;
`;

const StyledCorrectImg = styled.img`
  width: 200px;
`;

const StyledWrongImg = styled.img`
  width: 150px;
`;

const StyledImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 330px;
  height: 247px;
  background-color: rgba(0, 0, 0, 0.07);
`;

const StyledImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.p`
  font-size: 30px;
  margin: 0 auto 10px;
  font-weight: bold;
`;

const StyledP = styled.p`
  margin-top: 14px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
`;
