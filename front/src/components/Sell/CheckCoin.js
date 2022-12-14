import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useImageContext } from 'context/ImageContext';

import * as Api from 'api/api';

import Loading from 'components/Loading';

import exampleImage from 'assets/images/image_coin_detect.png';
import SellCoinList from './SellCoinList';
import SellButton from './SellButton';

function CheckCoin({ currentStep, setCurrentStep }) {
  const { imageUrl } = useImageContext();
  const portNum = 3000;
  const url = 'http://' + window.location.hostname + ':' + portNum + '/';

  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState();
  const [coinImg, setCoinImg] = useState();

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setLoading(true);
      try {
        const response = await Api.post('analysis', { img: imageUrl });
        console.log(response.data);
        setCoinData(response.data[0]);
        setCoinImg(response.data[1]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnalysisData();
  }, [imageUrl]);

  return (
    <>
      {loading && <Loading />}
      <StyledDiv>
        <h2>분석결과</h2>
        <img src={url + 'img/' + coinImg} style={{ width: '500px' }}></img>

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
        <SellButton coinData={coinData}></SellButton>
      </StyledBtnWrapper>
    </>
  );
}

export default CheckCoin;

const StyledDiv = styled.div`
  margin: 50px auto 10px;

  & h2 {
    font-size: 25px;
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
