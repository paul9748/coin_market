import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import styled from 'styled-components';

import UploadImage from '../components/Sell/UploadImage';

function SellCoin() {
   return (
      <>
         <Header backColor="#2AC1BC" logoImage="white" color="white"></Header>
         <StyledMain>
            <StyledTitle>
               <TitleLabel>STEP 2</TitleLabel>
               <TitleContent>사진을 업로드 해주세요.</TitleContent>
            </StyledTitle>
            <UploadImage></UploadImage>
         </StyledMain>
         <Footer></Footer>
      </>
   );
}

export default SellCoin;

const StyledMain = styled.main`
   display: flex;
   flex-direction: column;
   min-height: calc(100vh - 200px);
   min-width: 500px;
   margin: 0 auto;
`;

const StyledTitle = styled.div`
   display: flex;
   margin: 20px auto;
   width: 500px;
`;

const TitleLabel = styled.div`
   position: relative;
   padding: 10px;
   border-radius: 10px;
   font-size: 30px;
   font-weight: bold;
   color: white;
   background-color: #2ac1bc;

   &:after {
      border-top: 15px solid #2ac1bc;
      border-left: 30px solid transparent;
      content: '';
      top: 50px;
      right: 10px;
      position: absolute;
   }
`;

const TitleContent = styled.div`
   background-color: rgba(42, 193, 188, 0.2);
   position: relative;
   top: 40px;
   left: 10px;
   width: 330px;
   line-height: 50px;
   text-indent: 20px;
   font-weight: bold;
`;
