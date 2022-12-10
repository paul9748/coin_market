import styled from 'styled-components';

import japan from 'assets/images/japan.png';
import china from 'assets/images/china.png';
import usa from 'assets/images/usa.jpg';
import korea from 'assets/images/korea.png';
import japan100_f from 'assets/images/japan100_f.png';
import japan500_f from 'assets/images/japan500_f.png';
import china1_f from 'assets/images/china1_f.png';
import usa10_f from 'assets/images/usa10_f.png';
import usa25_f from 'assets/images/usa25_f.png';
import korea100_f from 'assets/images/korea100_f.png';
import korea500_f from 'assets/images/korea500_f.png';

function SellCoinItem() {
  const RATE = 942;
  return (
    <>
      <StyledNationWrapper>
        <div>기준환율: {RATE} KRW/JPY100</div>
        <StyledNationContentWrapper>
          <StyledCoinListTitle>
            <StyledImg src={japan} />
            <div>일본 JPY</div>
            <div>
              합계 : {2323}엔
              <br />
              {432432}원
            </div>
          </StyledCoinListTitle>
          <StyledCoinListContent>
            <StyledCoin>
              <StyledCoinImg src={japan100_f} />
              <div>
                <div>100엔 x {10}개 =</div>
                <div>{RATE * 10}원</div>
              </div>
              <div>
                <StyledBtn>+</StyledBtn>
                <StyledBtn>-</StyledBtn>
              </div>
            </StyledCoin>
            <StyledCoin>
              <StyledCoinImg src={japan100_f} />
              <div>
                <div>500엔 x {10}개 =</div>
                <div>{RATE * 5 * 10}원</div>
              </div>
              <div>
                <StyledBtn>+</StyledBtn>
                <StyledBtn>-</StyledBtn>
              </div>
            </StyledCoin>
          </StyledCoinListContent>
        </StyledNationContentWrapper>
      </StyledNationWrapper>
    </>
  );
}

export default SellCoinItem;

const StyledNationWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:first-child {
    width: 500px;
    margin: 10px 0;
    text-align: right;
    @media (max-width: 600px) {
      width: 400px;
    }
  }
`;

const StyledNationContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 300px;
  margin-bottom: 30px;
  width: 500px;
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const StyledCoinListTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  width: 400px;
  padding: 20px;

  @media (max-width: 600px) {
    width: 330px;
  }
`;

const StyledCoinListContent = styled.div``;

const StyledCoin = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 600px) {
    width: 330px;
  }
`;

const StyledImg = styled.img`
  width: 55px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 1px;
  margin-right: 20px;
  z-index: -1;
`;

const StyledCoinImg = styled.img`
  width: 50px;
`;

const StyledBtn = styled.button`
  width: 45px;
  height: 40px;
  font-size: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  background-color: rgba(42, 193, 188, 0.4);

  & + & {
    margin-left: 8px;
  }

  &:hover {
    background-color: rgba(42, 193, 188, 0.7);
  }
`;
