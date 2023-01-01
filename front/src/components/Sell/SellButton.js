import styled from 'styled-components';

import * as Api from 'api/api';
import { useCoinContext } from 'context/CoinContext';
import { useNavigate } from 'react-router-dom';
import ROUTE from 'utils/ROUTE';

function SellButton({ coinData, img }) {
  const { setSellNumber } = useCoinContext();
  const navigate = useNavigate();

  const coins = [];

  coinData.JPY && coins.push(...coinData.JPY);
  coinData.CNY && coins.push(...coinData.CNY);
  coinData.USD && coins.push(...coinData.USD);

  const handleClick = async () => {
    const data = {
      order: {
        imageUrl: img,
        dealStatus: 'SELL',
      },
      coins,
    };
    try {
      const response = await Api.post('sell', data);
      const result = response.data.split(' ');
      setSellNumber(result[result.length - 1]);
      navigate(ROUTE.SELLEND);
    } catch (err) {
      console.log(err);
      alert('판매가 완료되지 않았습니다.');
    }
  };

  return <StyledBtn onClick={handleClick}>판매</StyledBtn>;
}

export default SellButton;

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
