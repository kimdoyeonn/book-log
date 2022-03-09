import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TitleBar = ({
  username,
  handleLogout,
  isLogin,
}: {
  username: string;
  handleLogout: () => void;
  isLogin: boolean;
}) => {
  return (
    <TitleContainer>
      <LogoContent>
        {isLogin ? (
          <Link
            to="/booklist"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            BOOK LOG
          </Link>
        ) : (
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            BOOK LOG
          </Link>
        )}
      </LogoContent>
      {isLogin ? (
        <>
          <Bar>
            <Link
              to="/mypage"
              style={{
                color: 'white',
                zIndex: 2,
                textDecoration: 'none',
              }}
            >
              <h3>
                {username}님의 {'\n'}마이페이지
              </h3>
            </Link>
          </Bar>
          <Bar>
            <Link
              to="/"
              onClick={() => handleLogout()}
              style={{
                color: 'white',
                zIndex: 2,
                textDecoration: 'none',
              }}
            >
              <h3>로그아웃</h3>
            </Link>
          </Bar>
        </>
      ) : null}
    </TitleContainer>
  );
};

export default TitleBar;

const TitleContainer = styled.div`
  width: 100%;
  height: 4rem;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  background-color: #0b3961;
  z-index: 5;
  color: white;
`;

const LogoContent = styled.div`
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
  flex: 7;
`;

const Logo = styled.link`
  &:hover {
    cursor: pointer;
  }
`;

const Bar = styled.div`
  float: right;
  font-size: 12px;
  z-index: -1;
  text-align: center;
  cursor: pointer;
  margin: 20px;
  flex: 1;
  white-space: pre-line;
`;
