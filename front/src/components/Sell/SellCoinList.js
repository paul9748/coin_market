import SellCoinItem from './SellCoinItem';

function SellCoinList({ jpyRate, cnyRate, usdRate, coinData }) {
  //{"JPY": [{coinId:3423324, coinAmount: 10},{coinId: 34233255, coinAmount: 20}],
  // "CNY": [{coinId:32434, coinAmount:12}]}
  // props.coinData?.JPY;
  // props.coinData.JPY.basePrice

  return (
    <>
      <SellCoinItem jpyRate={jpyRate}></SellCoinItem>
    </>
  );
}

export default SellCoinList;
