import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useImageContext } from 'context/ImageContext';

import * as Api from 'api/api';

import SellCoinList from './SellCoinList';
import SellButton from './SellButton';
import Loading from 'components/Loading';

function CheckCoin({ currentStep, setCurrentStep }) {
  const navigate = useNavigate();
  const { imageUrl } = useImageContext();
  const portNum = 3000;
  const url = 'http://' + window.location.hostname + ':' + portNum + '/';

  const initialValue = { JPY: [{ coinId: '', dealAmount: 0 }] };
  const [coinData, setCoinData] = useState(initialValue);
  const [coinImg, setCoinImg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await Api.post('analysis', { img: imageUrl });
        setCoinData(response.data[0]);
        setCoinImg(response.data[1]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert('사진 분석에 실패하였습니다.');
        setLoading(false);
        setCurrentStep((preState) => preState - 1);
      }
    };
    fetchAnalysisData();
  }, [imageUrl, currentStep, setCurrentStep]);

  if (loading) return <Loading></Loading>;

  return (
    <>
      <StyledDiv>
        <h2>분석결과</h2>
        <StyledImg src={`${url}img/${coinImg}`} alt="분석이미지"></StyledImg>
        <h2>판매신청 코인</h2>
        <SellCoinList
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          coinData={coinData}
          setCoinData={setCoinData}></SellCoinList>
      </StyledDiv>
      <StyledBtnWrapper>
        {currentStep !== 0 && (
          <StyledBtn
            onClick={() => {
              setCurrentStep((preState) => preState - 1);
            }}>
            이전
          </StyledBtn>
        )}
        <SellButton coinData={coinData} img={coinImg}></SellButton>
      </StyledBtnWrapper>
    </>
  );
}

export default CheckCoin;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 10px;

  & h2 {
    font-size: 40px;
    font-weight: bold;
    margin: 15px 0;
  }

  & > img {
    margin-bottom: 30px;
  }
`;

const StyledBtn = styled.button`
  width: 100px;
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
  justify-content: space-evenly;

  margin: 40px 0;
`;

const StyledImg = styled.img`
  width: 400px;

  @media (max-width: 450px) {
    width: 370px;
  }
`;
