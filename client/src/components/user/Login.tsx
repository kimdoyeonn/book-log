import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { LoginProps } from '../../pages/Main';

axios.defaults.withCredentials = true;

export default function Login({ handleLogin, handleUsername }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (e: ChangeEvent, type: string) => {
    const { value } = e.target as HTMLInputElement;

    if (type === 'email') setEmail(value);
    else if (type === 'password') setPassword(value);
  };

  const navigate = useNavigate();
  // const loginRequest = () => {
  //   const { email, password } = loginInfo;
  //   if (!email || !password) {
  //     setErrorMessage('이메일과 비밀번호를 입력하세요');
  //   } else {
  //     axios({
  //       method: 'POST',
  //       url: `${process.env.REACT_APP_SERVER_URL}/user/login/general`,
  //       data: {
  //         email,
  //         password,
  //       },
  //     })
  //       .then((result) => {
  //         if (result.status === 200) {
  //           const username = result.data.data.username;
  //           handleUsername(username);
  //           handleLogin();
  //           navigate('/booklist', { replace: true });
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 401) {
  //           setErrorMessage('이메일 또는 비밀번호가 틀렸습니다.');
  //         } else {
  //           setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
  //         }
  //       });
  //   }
  // };

  const googleLoginRequest = async () => {
    const authURL = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/auth/google`,
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
    window.location.href = authURL;
  };

  return (
    <LoginContainer>
      <Title>Sign In</Title>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
        <InputContainer>
          <Input
            type="email"
            value={email}
            onChange={(e) => handleInputValue(e, 'email')}
            placeholder="이메일"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => handleInputValue(e, 'password')}
            placeholder="비밀번호"
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="button">로그인</Button>
          <Button type="button" onClick={googleLoginRequest}>
            Sign in with google
          </Button>
        </ButtonContainer>
      </LoginForm>

      <LoginSignupBox>
        <div>회원이 아니신가요?</div>
        <Link to="/signup"> 회원가입</Link>
      </LoginSignupBox>

      <div className="alert-box">{errorMessage}</div>
    </LoginContainer>
  );
}

const LoginContainer = styled.main`
  padding-top: 2rem;

  height: 100%;
  width: 100%;

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 6rem;
  margin-bottom: 2rem;
  width: 17rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 6rem;
`;

const Input = styled.input`
  height: 2.5rem;
  width: 17rem;
  padding: 0.6rem 1rem;
  border: 1px solid rgb(0, 0, 0, 0.3);
  border-radius: 2px;
  outline: none;
`;

const Button = styled.button`
  height: 2.5rem;
  width: 17rem;
  border: none;
  background: rgb(172, 185, 146);
  border-radius: 2px;
  font-weight: 600;

  cursor: pointer;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginSignupBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.4rem;

  & > div {
    margin-right: 0.3rem;
  }

  & > a {
  }
`;
