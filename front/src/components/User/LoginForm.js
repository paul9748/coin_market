import { useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ROUTE from 'utils/ROUTE';
import { emailvalidation } from 'utils/validation';

import * as Api from 'api/api';

function LoginForm() {
  const labelIdRef = useRef();
  const inputIdRef = useRef();
  const labelPwRef = useRef();
  const inputPwRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isIdFocus, setIdFocus] = useState(false);
  const [isPwFocus, setPwFocus] = useState(false);

  const navigate = useNavigate();
  const idValidation = emailvalidation(email);
  const passwordValidation = password.length >= 2 && password.length <= 40;

  const validation = idValidation && passwordValidation;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('users/login', { email, password });

      const { access_token, refresh_token } = response.data;

      sessionStorage.setItem('ACCESS_TOKEN', access_token);
      sessionStorage.setItem('REFRESH_TOKEN', refresh_token);
      setEmail('');
      setPassword('');

      navigate('/');
    } catch (error) {
      console.log(error);
      alert(error.response.data);
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    if (email.length !== 0 || isIdFocus) {
      labelIdRef.current.style.transform =
        'translateX(-15px) translateY(-15px) scale(0.7)';
      labelIdRef.current.style.visibility = 'visible';
      inputIdRef.current.style.paddingTop = '25px';
      inputIdRef.current.style.paddingBottom = '15px';
    } else {
      labelIdRef.current.style.transform = 'translateY(0px)';
      labelIdRef.current.style.visibility = 'hidden';
      inputIdRef.current.style.paddingTop = '20px';
      inputIdRef.current.style.paddingBottom = '20px';
    }
  }, [email, isIdFocus]);

  useEffect(() => {
    if (password.length !== 0 || isPwFocus) {
      labelPwRef.current.style.transform =
        'translateX(-15px) translateY(-15px) scale(0.7)';
      labelPwRef.current.style.visibility = 'visible';
      inputPwRef.current.style.paddingTop = '25px';
      inputPwRef.current.style.paddingBottom = '15px';
    } else {
      labelPwRef.current.style.transform = 'translateY(0px)';
      labelPwRef.current.style.visibility = 'hidden';
      inputPwRef.current.style.paddingTop = '20px';
      inputPwRef.current.style.paddingBottom = '20px';
    }
  }, [password, isPwFocus]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledDiv>
        <StyledLabel ref={labelIdRef} htmlFor="email">
          이메일
        </StyledLabel>
        <StyledInput
          ref={inputIdRef}
          id="email"
          name="email"
          type="text"
          onFocus={() => setIdFocus(true)}
          onBlur={() => setIdFocus(false)}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="이메일"></StyledInput>
        {idValidation ? null : (
          <StyledIdValidationContent>
            {email.length === 0 ? null : '이메일 형식으로 작성해주세요.'}
          </StyledIdValidationContent>
        )}
      </StyledDiv>
      <StyledDiv>
        <StyledLabel ref={labelPwRef} htmlFor="password">
          비밀번호
        </StyledLabel>
        <StyledInput
          ref={inputPwRef}
          placeholder="비밀번호"
          id="password"
          name="password"
          type="password"
          onFocus={() => setPwFocus(true)}
          onBlur={() => setPwFocus(false)}
          onChange={(e) => setPassword(e.target.value)}
          value={password}></StyledInput>
        {passwordValidation ? null : (
          <StyledIdValidationContent>
            {password.length === 0 ? null : '비밀번호는 2자리 이상 입력해주세요.'}
          </StyledIdValidationContent>
        )}
      </StyledDiv>
      <BtnLogin disabled={!validation}>로그인</BtnLogin>
      <StyledP>
        아직 회원이 아니신가요?
        <StyledLink to={ROUTE.REGISTER}>등록</StyledLink>
      </StyledP>
    </StyledForm>
  );
}

export default LoginForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  height: 500px;
  margin: 100px auto;
  background-color: #d9d9d9;
  border-radius: 40px;
  filter: drop-shadow(20px 10px 4px rgba(0, 0, 0, 0.25));

  @media (max-width: 465px) {
    width: 330px;
  }
`;

const StyledDiv = styled.div`
  position: relative;
  margin: 0 50px 40px;
`;

const StyledLabel = styled.label`
  visibility: hidden;
  position: absolute;
  top: 20px;
  left: 20px;
  transition: all 0.3s;
`;

const StyledInput = styled.input`
  color: black;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 20px 0;
  width: 300px;
  text-indent: 20px;
  box-sizing: border-box;
  &:focus {
    outline: 0;
  }
  @media (max-width: 465px) {
    width: 240px;
  }
  @media (max-width: 400px) {
    width: 220px;
  }
`;

const BtnLogin = styled.button`
  height: 50px;
  margin: 10px 50px;
  cursor: pointer;
  background-color: rgb(42, 193, 188);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: rgba(42, 193, 188, 0.5);
  }

  &:disabled {
    cursor: no-drop;
  }
`;

const StyledP = styled.p`
  margin: 14px 0 0 50px;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  margin-left: 15px;
  color: blue;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StyledIdValidationContent = styled.p`
  margin-top: 10px;
  text-indent: 10px;
  color: red;
`;
