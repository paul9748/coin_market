import { useEffect, useState } from 'react';

function useProvideAuth() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('ACCESS_TOKEN')) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  return { isLogin, setIsLogin };
}

export default useProvideAuth;
