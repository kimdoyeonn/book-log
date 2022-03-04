import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { userApi } from '../api';

import { Container } from '../components/user/Login';
import Modal from '../components/Modal';
import Input from '../components/user/Input';
import Button from '../components/user/Button';

export interface SignupProps {
  handleUsername: (input: string) => void;
}

const Signup = ({ handleUsername }: SignupProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passCheck, setPassCheck] = useState<string>('');

  const [usermodal, setUserModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e: ChangeEvent, type: string) => {
    const { value } = e.target as HTMLInputElement;

    if (type === 'email') setEmail(value);
    else if (type === 'username') setUsername(value);
    else if (type === 'password') setPassword(value);
    else if (type === 'passCheck') setPassCheck(value);
  };

  const checkEmail = (email: string) => {
    let reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  const handleSignUp = async () => {
    if (!email || !username || !password || !passCheck) {
      setErrorMessage(
        '이메일, username, 2번의 비밀번호 모두 다 입력해야합니다.'
      );
    } else if (!checkEmail(email)) {
      setErrorMessage('올바른 이메일 형식을 입력해주세요.');
    } else if (username.length > 10) {
      setErrorMessage('username은 10글자이내로 입력해야합니다.');
    } else if (password.length < 8) {
      setErrorMessage('비밀번호는 8글자 이상이어야합니다.');
    } else if (passCheck !== password) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      try {
        const result = await userApi.signup(email, username, password);
        setUserModal(true);
        // const username = result.data.data.userInfo.username;
        // handleUsername(username); 다시 로그인해야하므로 username 변경 안해도 됨
        setTimeout(() => navigate('/', { replace: true }), 3000);
      } catch (e: unknown) {
        if (e instanceof Error) {
          // todo 동일한 이메일확인하기 버튼 추가
          // todo 에러 처리
          setErrorMessage('이미 동일한 이메일이 존재합니다.');
          // if (e.response.status === 409) {
          // } else {
          //   setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          // }
        }
      }
    }
  };
  return (
    <>
      {usermodal && (
        <SignUpModal>
          <br />
          <div>{username}님의 회원가입을 축하합니다!!!!</div>
          <br />
          <div>가입하신 정보로 로그인해주세요.</div>
          <br />
          <div> 잠시후 로그인 페이지로 이동합니다...</div>
          <br />
          <button onClick={() => navigate('/')} className="btn">
            로그인 화면 으로 이동
          </button>
        </SignUpModal>
      )}
      <Container>
        <h2>정보를 입력해주세요.</h2>
        <SignupForm onSubmit={handleSignUp}>
          <InputContainer>
            <Input
              type="email"
              value={email}
              handleChange={(e) => handleInput(e, 'email')}
              placeholder="이메일"
            />
            <Input
              type="text"
              value={username}
              handleChange={(e) => handleInput(e, 'username')}
              placeholder="username(10글자이내)"
            />
            <Input
              type="password"
              value={password}
              handleChange={(e) => handleInput(e, 'password')}
              placeholder="비밀번호"
            />
            <Input
              type="password"
              value={passCheck}
              handleChange={(e) => handleInput(e, 'passCheck')}
              placeholder="비밀번호 확인"
            />
          </InputContainer>
          <Button type="submit">SignUp</Button>
          <div className="alert-box">{errorMessage}</div>
        </SignupForm>
      </Container>
    </>
  );
};

export default Signup;

const SignUpModal = styled(Modal)``;

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 20rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 11rem;
  margin-top: 2rem;
`;
