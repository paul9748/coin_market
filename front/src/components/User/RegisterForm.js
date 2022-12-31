import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { emailvalidation, phoneNumberValidator } from 'utils/validation';

import * as Api from 'api/api';
import ROUTE from 'utils/ROUTE';

function RegisterForm() {
  const initialValue = { email: '', password: '', userName: '', phoneNumber: '' };

  const idRef = useRef(null);
  const pwRef = useRef(null);
  const pwCheckRef = useRef(null);
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const navigate = useNavigate();
  const [user, setUser] = useState(initialValue);
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;

    if (password.length === 0) {
      setPasswordCheck('');
    }

    return setUser(newUser);
  };

  const handlePasswordCheck = (e) => {
    return setPasswordCheck(e.target.value);
  };

  const { email, password, userName, phoneNumber } = user;

  const idValidation =
    email?.length >= 6 && email?.length <= 30 && emailvalidation(email);

  const passwordValidation = password?.length >= 4 && password?.length <= 30;
  const userNameValidation = userName?.length >= 2 && userName?.length <= 14;
  const phoneNumberValidation = phoneNumberValidator(phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idValidation) return idRef.current.focus();
    if (!passwordValidation) return pwRef.current.focus();
    if (!password === passwordCheck) return pwCheckRef.current.focus();
    if (!userNameValidation) return nameRef.current.focus();
    if (!phoneNumberValidation) return phoneNumberRef.current.focus();

    try {
      const response = await Api.post('users/register', user);
      console.log(response.data);
      setUser(initialValue);
      alert('회원가입에 성공하셨습니다.');
      navigate(ROUTE.LOGIN);
    } catch (error) {
      alert(error.response.data);
      setUser(initialValue);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="email">아이디</StyledLabel>
      <StyledInput
        type="text"
        id="email"
        name="email"
        placeholder="ooo@ooooo.ooo"
        onChange={handleChange}
        ref={idRef}
        value={email}></StyledInput>
      {idValidation ? (
        <StyledValidationComment>사용가능한 이메일입니다.</StyledValidationComment>
      ) : (
        <StyledValidationComment color="red">
          &nbsp;
          {email.length === 0 ? null : '6자 이상 이메일 형식으로 입력하세요.'}
        </StyledValidationComment>
      )}
      <StyledLabel htmlFor="password">비밀번호</StyledLabel>
      <StyledInput
        type="password"
        id="password"
        name="password"
        placeholder="영문/숫자/특수 4자 이상 30자 이하"
        onChange={handleChange}
        ref={pwRef}
        value={password}></StyledInput>
      {passwordValidation ? (
        <StyledValidationComment>사용가능한 비밀번호입니다.</StyledValidationComment>
      ) : (
        <StyledValidationComment color="red">
          &nbsp;
          {password.length === 0
            ? null
            : '영문/숫자/특수문자 4자 이상 30자 이하 입력하세요.'}
        </StyledValidationComment>
      )}
      <StyledLabel htmlFor="passwordCheck">비밀번호 확인</StyledLabel>
      <StyledInput
        type="password"
        id="passwordCheck"
        name="passwordCheck"
        disabled={password.length === 0}
        ref={pwCheckRef}
        value={password.length === 0 ? '' : passwordCheck}
        onChange={handlePasswordCheck}></StyledInput>
      {password.length !== 0 && passwordCheck === password ? (
        <StyledValidationComment>비밀번호가 일치합니다.</StyledValidationComment>
      ) : (
        <StyledValidationComment color="red">
          &nbsp;
          {passwordCheck.length === 0 || password.length === 0
            ? null
            : '비밀번호가 일치하지 않습니다.'}
        </StyledValidationComment>
      )}
      <StyledLabel htmlFor="userName">성명</StyledLabel>
      <StyledInput
        type="text"
        id="userName"
        name="userName"
        placeholder="영문/숫자 2자 이상 14자 이하"
        onChange={handleChange}
        ref={nameRef}
        value={userName}></StyledInput>
      {userNameValidation ? (
        <StyledValidationComment>올바른 형식입니다.</StyledValidationComment>
      ) : (
        <StyledValidationComment color="red">
          &nbsp;
          {userName.length === 0 ? null : '영문/숫자 2자 이상 14자 이하 입력하세요.'}
        </StyledValidationComment>
      )}

      <StyledLabel htmlFor="phoneNumber">전화번호</StyledLabel>
      <StyledInput
        type="tel"
        id="phoneNumber"
        name="phoneNumber"
        placeholder="00(0)-0000-0000"
        onChange={handleChange}
        ref={phoneNumberRef}
        value={phoneNumber}></StyledInput>
      {phoneNumberValidation ? (
        <StyledValidationComment>올바른 전화번호입니다.</StyledValidationComment>
      ) : (
        <StyledValidationComment color="red">
          &nbsp;
          {phoneNumber.length === 0 ? null : '하이픈(-)을 넣어 입력하세요.'}
        </StyledValidationComment>
      )}

      <BtnLogin>회원가입</BtnLogin>
    </StyledForm>
  );
}

export default RegisterForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 700px;
  margin: 100px auto;
  background-color: #d9d9d9;
  border-radius: 40px;
  filter: drop-shadow(20px 10px 4px rgba(0, 0, 0, 0.25));
  @media (max-width: 465px) {
    width: 330px;
    border-radius: 20px;
  }
`;

const StyledInput = styled.input`
  color: black;
  border: none;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 0;
  width: 300px;
  text-indent: 20px;
  box-sizing: border-box;
  @media (max-width: 465px) {
    width: 230px;
    font-size: 0.8rem;
  }
`;

const StyledLabel = styled.label`
  align-self: flex-start;
  margin-left: 50px;
  padding: 8px;
  background-color: rgba(42, 193, 188, 0.3);
  font-weight: bold;
`;

const BtnLogin = styled.button`
  height: 50px;
  margin: 10px 50px;
  width: 300px;
  cursor: pointer;
  background-color: rgb(42, 193, 188);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: rgba(42, 193, 188, 0.5);
  }
  @media (max-width: 465px) {
    width: 230px;
  }
`;

const StyledValidationComment = styled.p`
  color: blue;
  align-self: flex-start;
  text-indent: 50px;
  margin: 12px 0;
  font-size: 14px;

  color: ${(props) => props.color};
`;
