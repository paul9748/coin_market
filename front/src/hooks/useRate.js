import { useEffect, useState } from 'react';

import * as Api from 'api/api';

function useRate() {
  const [jpyRate, setJpyRate] = useState();
  const [cnyRate, setCnyRate] = useState();
  const [usdRate, setUsdRate] = useState();

  const fetchJPYExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=JPY');
      setJpyRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCNYExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=CNY');
      setCnyRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUSDExchangeRateData = async () => {
    try {
      const response = await Api.get('exchangeRate?countryCode=USD');
      setUsdRate(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJPYExchangeRateData();
    fetchCNYExchangeRateData();
    fetchUSDExchangeRateData();
  }, []);

  return { jpyRate, cnyRate, usdRate };
}

export default useRate;
