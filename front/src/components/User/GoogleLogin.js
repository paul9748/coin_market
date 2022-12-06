import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';

function GoogleLogIn() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      sessionStorage.setItem('ACCESS_TOKEN', tokenResponse.access_token);
    },

    onError: (err) => console.log(err),
  });

  return (
    <>
      <StyledBtn
        onClick={(e) => {
          e.preventDefault();
          login();
        }}>
        sign in with google
      </StyledBtn>
    </>
  );
}

export default GoogleLogIn;

const StyledBtn = styled.button`
  height: 50px;
  margin: 10px 50px;
  cursor: pointer;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  font-size: 18px;
  font-weight: bold;
  background-image: url('/google-logo.png');
  background-size: 50px;
  background-repeat: no-repeat;
  &:hover {
    background-color: rgba(42, 193, 188, 0.1);
  }
`;
