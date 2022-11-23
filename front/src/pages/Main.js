import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';

function Main() {
   return (
      <>
         <Header></Header>
         <main style={{ minHeight: 'calc(100vh - 180px)' }}>
            <div
               style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  height: '1000px',
               }}>
               커버이미지
            </div>
            <div
               style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  height: '1000px',
               }}>
               커버이미지
            </div>
            <div
               style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  height: '1000px',
               }}>
               커버이미지
            </div>
            <div
               style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  height: '1000px',
               }}>
               커버이미지
            </div>
         </main>
         <Footer></Footer>
      </>
   );
}

export default Main;
