import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useImageContext } from 'context/ImageContext';

import * as Api from 'api/api';

import Loading from 'components/Loading';

import exampleImage from 'assets/images/image_coin_detect.png';
import SellCoinList from './SellCoinList';

function CheckCoin() {
  const { imageUrl } = useImageContext();
  const [loading, setLoading] = useState(false);

  const [jpyRate, setJpyRate] = useState();
  const [cnyRate, setCnyRate] = useState();
  const [usdRate, setUsdRate] = useState();

  const [coinData, setCoinData] = useState();

  const fetchAnalysisData = async () => {
    try {
      const response = await Api.post('analysis', { img: imageUrl });
      console.log(response.data);
      setCoinData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchJPYExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=JPY');
      console.log(response.data);
      setJpyRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCNYExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=CNY');
      console.log(response.data);
      setCnyRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUSDExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=USD');
      console.log(response.data);
      setUsdRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   setLoading(true);
  //   fetchAnalysisData();
  //   fetchJPYExchangeRateData();
  //   fetchCNYExchangeRateData();
  //   fetchUSDExchangeRateData();
  //   setLoading(false);
  // }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <StyledDiv>
        <h2>분석결과</h2>
        <img src={exampleImage} style={{ width: '500px' }}></img>

        <h2>판매신청 코인</h2>
        <SellCoinList
          jpyRate={jpyRate}
          cnyRate={cnyRate}
          usdRate={usdRate}
          coinData={coinData}></SellCoinList>
      </StyledDiv>
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
