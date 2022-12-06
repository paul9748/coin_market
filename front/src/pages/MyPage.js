import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';

import ROUTE from 'utils/ROUTE';

function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('ACCESS_TOKEN')) {
      navigate(ROUTE.LOGIN);
    }
  }, [navigate]);

  return (
    <>
      <h1>마이페이지</h1>
      <dt>Email</dt>
      {/* <dd>{email}</dd> */}
      <dt>Name</dt>
      {/* <dd>{userName}</dd> */}
    </>
  );
}

export default MyPage;
