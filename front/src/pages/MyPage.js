import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import ROUTE from 'utils/ROUTE';

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <StyledMain>
        <StyledTitleBox>
          <StyledTitle>마이페이지</StyledTitle>
        </StyledTitleBox>
        <StyledInfoBox>
          <StyledWalletBox>
            <StyledText>환전가능금액</StyledText>
            <StyledText>가져온금액</StyledText>
            <StyledBtn>환전하기</StyledBtn>
          </StyledWalletBox>
          <StyledDealBox>
            <StyledTitle>거래현황</StyledTitle>
            <StyledDetailBox>
              <StyledText>구매신청</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송중ㅤ</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>구매완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매신청</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>배송완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
            <StyledDetailBox>
              <StyledText>판매완료</StyledText>
              <StyledInfoBtn href="#">7</StyledInfoBtn>
              <StyledText>건</StyledText>
            </StyledDetailBox>
          </StyledDealBox>
        </StyledInfoBox>

        <dt>Email</dt>
        {/* <dd>{email}</dd> */}
        <dt>Name</dt>
        {/* <dd>{userName}</dd> */}
      </StyledMain>

      <Footer></Footer>
    </>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 300px;
  }
  margin-left: 5%;
  margin-right: 5%;
`;
const StyledTitleBox = styled.main`
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: left;
  width: 100%;
`;
const StyledInfoBox = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-style: solid none solid none;
`;
const StyledDealBox = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  border-style: none solid none none;
  flex-wrap: wrap;
  padding: 30px 30px 30px 30px;
`;

const StyledDetailBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 30px;
  border-style: none;
  flex-wrap: wrap;
`;

const StyledWalletBox = styled.main`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 150px;
  justify-content: center;
  align-items: center;
  border-style: none solid none none;
  padding: 30px 30px 30px 30px;
`;

const StyledTitle = styled.p`
  font-size: 30px;
  margin: 0 auto 10px;
  font-weight: bold;
  float: left;
  width: 100%;
`;
const StyledText = styled.p`
  font-size: 20px;
  margin: 0 auto 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
`;
const StyledBtn = styled.button`
  width: 100px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(42, 193, 188, 0.5);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: rgba(42, 193, 188, 0.3);
  }
`;
const StyledInfoBtn = styled.a`
  text-decoration: none;
  font-size: 20px;
  margin: 0 auto 10px;
  font-weight: bold;
  text-align: right;
  padding: 5px;
  width: 160px;
  color: blue;
`;
export default MyPage;
