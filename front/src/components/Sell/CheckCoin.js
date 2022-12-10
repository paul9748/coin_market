import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useImageContext } from 'context/ImageContext';

import * as Api from 'api/api';

import Loading from 'components/Loading';

import useRate from 'hooks/useRate';

import exampleImage from 'assets/images/image_coin_detect.png';
import SellCoinList from './SellCoinList';

function CheckCoin() {
  const { imageUrl } = useImageContext();
  const { jpyRate, cnyRate, usdRate } = useRate();

  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState();

  useEffect(() => {
    const fetchAnalysisData = async () => {
      setLoading(true);
      try {
        const response = await Api.post('analysis', { img: imageUrl });
        console.log(response.data);
        setCoinData(response.data);
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
