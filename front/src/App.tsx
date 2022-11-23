import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import Login from './pages/Login';
import Main from './pages/Main';
import SellCoin from './pages/SellCoin';
import NotFound from './pages/NotFound';

function App() {
   return (
      <div className="App">
         <GlobalStyle></GlobalStyle>
         <Router>
            <Routes>
               <Route path="/" element={<Main />}></Route>
               <Route path="/login" element={<Login />}></Route>
               <Route path="/sell" element={<SellCoin />}></Route>
               <Route path="*" element={<NotFound />}></Route>
            </Routes>
         </Router>
      </div>
   );
}

export default App;
