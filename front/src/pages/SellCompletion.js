import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTE from 'utils/ROUTE';
import { useCoinContext } from 'context/CoinContext';
import Header from 'components/UI/Header';
import Footer from 'components/UI/Footer';

import * as Api from 'api/api';

function SellCompletion() {
  const navigate = useNavigate();

  const { sellNumber } = useCoinContext();
  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      alert('로그인이 필요합니다.');
      navigate(ROUTE.LOGIN);
    }

    const uploadData = async () => {
      await deliveryData();
      try {
        const response = await Api.post(`sell/${sellNumber}`);
      } catch (err) {
        console.log(err);
        alert('판매가 완료되지 않았습니다. ');
      }
    };
    const deliveryData = async () => {
      try {
        const response = await Api.post(`sell/${sellNumber}/deliveryNumber`, {
          deliveryNumber: `${Math.random() * 10}`,
        });
      } catch (err) {
        console.log(err);
        alert('배송 운송장 관련 오류가 발생하였습니다.');
      }
    };

    uploadData();
  }, [navigate, sellNumber]);

  return (
    <>
      <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
      <StyledMain>
        <StyledDiv>
          <StyledContent>
            <p>판매신청이 완료되었습니다.</p>
            <p>상세내역은 마이페이지에서 확인해주세요.</p>
          </StyledContent>

          <StyledBtnWrapper>
            <StyledBtn
              onClick={() => {
                navigate(ROUTE.MAIN);
              }}>
              홈화면으로 이동
            </StyledBtn>
            <StyledBtn
              onClick={() => {
                navigate(ROUTE.MYPAGE);
              }}>
              마이페이지로 이동
            </StyledBtn>
          </StyledBtnWrapper>
        </StyledDiv>
      </StyledMain>
      <Footer></Footer>
    </>
  );
}

export default SellCompletion;

const StyledBtn = styled.button`
  width: 180px;
  height: 50px;
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

const StyledBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 40px 0;

  @media (max-width: 530px) {
    width: 380px;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  min-height: calc(100vh - 200px);
  min-width: 600px;

  @media (max-width: 600px) {
    min-width: 440px;
  }
  @media (max-width: 400px) {
    min-width: 380px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 400px;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 20px;
  padding: 30px;
  border-radius: 20px;
  background-color: rgba(42, 193, 188, 0.3);

  & p + p {
    margin-top: 30px;
  }
  @media (max-width: 530px) {
    width: 350px;
    font-size: 18px;
  }
  @media (max-width: 460px) {
    width: 300px;
    font-size: 15px;
  }
`;
