import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from 'assets/styles/GlobalStyle';
import Login from 'pages/Login';
import Main from 'pages/Main';
import SellCoin from 'pages/SellCoin';
import NotFound from 'pages/NotFound';
import ROUTE from 'utils/ROUTE';
import Register from 'pages/Register';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path={ROUTE.MAIN} element={<Main />}></Route>
          <Route path={ROUTE.LOGIN} element={<Login />}></Route>
          <Route path={ROUTE.SELL} element={<SellCoin />}></Route>
          <Route path={ROUTE.REGISTER} element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
