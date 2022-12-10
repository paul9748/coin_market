import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'assets/styles/GlobalStyle';

import ROUTE from 'utils/ROUTE';

import Login from 'pages/Login';
import Main from 'pages/Main';
import BuyCoin from 'pages/BuyCoin';
import SellCoin from 'pages/SellCoin';
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';
import MyPage from 'pages/MyPage';
import About from 'pages/About';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ImageContextProvider } from 'context/ImageContext';
import { CoinContextProvider } from 'context/CoinContext';

function App() {
  return (
    <div className="App">
      <ImageContextProvider>
        <CoinContextProvider>
          <GlobalStyle />
          <Router>
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
              <Routes>
                <Route path={ROUTE.MAIN} element={<Main />}></Route>
                <Route path={ROUTE.LOGIN} element={<Login />}></Route>
                <Route path={ROUTE.ABOUT} element={<About />}></Route>
                <Route path={ROUTE.BUY} element={<BuyCoin />}></Route>
                <Route path={ROUTE.SELL} element={<SellCoin />}></Route>
                <Route path={ROUTE.REGISTER} element={<Register />}></Route>
                <Route path={ROUTE.MYPAGE} element={<MyPage />}></Route>
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </GoogleOAuthProvider>
          </Router>
        </CoinContextProvider>
      </ImageContextProvider>
    </div>
  );
}

export default App;
