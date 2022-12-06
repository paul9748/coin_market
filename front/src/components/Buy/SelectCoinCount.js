import japan100_f from 'assets/images/japan100_f.png';
import japan500_f from 'assets/images/japan500_f.png';
import china1_f from 'assets/images/china1_f.png';
import usa10_f from 'assets/images/usa10_f.png';
import usa25_f from 'assets/images/usa25_f.png';
import korea100_f from 'assets/images/korea100_f.png';
import korea500_f from 'assets/images/korea500_f.png';
import styled from 'styled-components';

function SelectCoinCount(props) {
  const nation = {
    JPY: { image: [japan100_f, japan500_f], name: ['일본100엔', '일본500엔'] },
    CNY: { image: [china1_f], name: ['중국1위안'] },
    USD: { image: [usa10_f, usa25_f], name: ['미국10센트', '미국25센트'] },
    KRW: { image: [korea100_f, korea500_f], name: ['한국100원', '한국500원'] },
  };

  return (
    <StyledWrapper>
      <StyledContentWrapper>
        <StyledContent>
          <StyledImg src={nation[props.selectNation].image[0]}></StyledImg>
          <span>{nation[props.selectNation].name[0]}</span>
        </StyledContent>
        <StyledContent>
          <span>재고수량</span>
          <span>3개</span>
        </StyledContent>
        <StyledContent>
          <span>구매수량</span>
          <StyledInput></StyledInput>
        </StyledContent>
      </StyledContentWrapper>
      {props.selectNation === 'CNY' ? null : (
        <StyledContentWrapper>
          <StyledContent>
            <StyledImg src={nation[props.selectNation].image[1]}></StyledImg>
            <span>{nation[props.selectNation].name[1]}</span>
          </StyledContent>
          <StyledContent>
            <span>재고수량</span>
            <span>3개</span>
          </StyledContent>
          <StyledContent>
            <span>구매수량</span>
            <StyledInput></StyledInput>
          </StyledContent>
        </StyledContentWrapper>
      )}
    </StyledWrapper>
  );
}

export default SelectCoinCount;

const StyledImg = styled.img`
  width: 50px;
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 320px;
  border: 10px solid rgb(42, 193, 188);
  border-radius: 15px;
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 70px;
  margin-top: 10px;
  justify-content: space-evenly;
  align-items: flex-start;
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  height: 60px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100px;
`;
