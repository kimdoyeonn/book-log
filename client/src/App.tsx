import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';

import TitleBar from './components/TitleBar';

import Main from './pages/Main';
import Signup from './pages/Signup';
import SelectBook from './pages/SelectBook';
import BookList from './pages/BookList';
import ReviewForm from './pages/ReviewForm';
import MainMyPage from './pages/MainMyPage';
import ChkPassPage from './pages/ChkPassPage';
import WithdrawalPage from './pages/WithdrawalPage';
import MdfPassPage from './pages/MdfPassPage';
import ReviewListPage from './pages/ReviewListPage';
import GoogleLoginPage from './pages/GoogleLoginPage';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('guest');

  const [bookInfo, setBookInfo] = useState({});

  const handleLogin = () => {
    setIsLogin(true);
  };
  const handleLogout = () => {
    setIsLogin(false);
    setUsername('guest');
  };
  const handleUsername = (input: string) => {
    setUsername(input);
  };

  const handleBookInfo = (book: any) => {
    setBookInfo(book);
  };

  const [currentBook, setCurrentBook] = useState({});

  const handleCurrentbook = (book: any) => {
    setCurrentBook(book);
  };

  return (
    <Container>
      <Router>
        <TitleBar
          username={username}
          handleLogout={handleLogout}
          isLogin={isLogin}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main handleLogin={handleLogin} handleUsername={handleUsername} />
            }
          ></Route>
          <Route
            path="/signup"
            element={<Signup handleUsername={handleUsername} />}
          ></Route>
          <Route
            path="/booklist"
            element={
              <BookList
                handleCurrentbook={handleCurrentbook}
                currentBook={currentBook}
                isLogin={isLogin}
              />
            }
          ></Route>
          <Route
            path="/review/book"
            element={
              <SelectBook handleBookInfo={handleBookInfo} isLogin={isLogin} />
            }
          ></Route>
          <Route
            path="/review"
            element={<ReviewForm bookInfo={bookInfo} isLogin={isLogin} />}
          ></Route>
          {/* 
          <Route
            path="/mypage"
            element={<MainMyPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            path="/checkpassword"
            element={<ChkPassPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            path="/withdrawal"
            element={
              <WithdrawalPage
                handleUsername={handleUsername}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>

          <Route
            path="/modify"
            element={<MdfPassPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            path="/booklist/reviewlist"
            element={
              <ReviewListPage
                currentBook={currentBook}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>

          <Route
            path="/login/google"
            element={
              <GoogleLoginPage
                handleLogin={handleLogin}
                handleUsername={handleUsername}
                useTitle={useTitle()}
              />
            }
          ></Route> */}
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  background-color: rgb(233, 229, 214);
  color: rgb(54, 39, 6);

  display: flex;
  justify-content: center;
  align-items: center;
`;
