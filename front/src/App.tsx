import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'assets/styles/GlobalStyle';

import ROUTE from 'utils/ROUTE';

import Login from 'pages/Login';
import Main from 'pages/Main';
import SellCoin from 'pages/SellCoin';
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';
import MyPage from 'pages/MyPage';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <GoogleOAuthProvider clientId="602643910111-25m9cjpo5k0l08s9j1fuf37fan016slb.apps.googleusercontent.com">
          <Routes>
            <Route path={ROUTE.MAIN} element={<Main />}></Route>
            <Route path={ROUTE.LOGIN} element={<Login />}></Route>
            <Route path={ROUTE.SELL} element={<SellCoin />}></Route>
            <Route path={ROUTE.REGISTER} element={<Register />}></Route>
            <Route path={ROUTE.MYPAGE} element={<MyPage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </GoogleOAuthProvider>
      </Router>
    </div>
  );
}

export default App;
