import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Main from './pages/Main';
import TitleBar from './components/TitleBar';
import SignUpPage from './pages/SignUpPage';
import MainMyPage from './pages/MainMyPage';
import ChkPassPage from './pages/ChkPassPage';
import WithdrawalPage from './pages/WithdrawalPage';
import MdfPassPage from './pages/MdfPassPage';
import BookListPage from './pages/BookListPage';
import ReviewListPage from './pages/ReviewListPage';
import SelectBookPage from './pages/SelectBookPage';
import ReviewInputPage from './pages/ReviewInputPage';
import GoogleLoginPage from './pages/GoogleLoginPage';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('guest');

  // const [bookInfo, setBookInfo] = useState({});

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

  // const handleBookInfo = (book) => {
  //   setBookInfo(book);
  // };

  // const [currentBook, setCurrentBook] = useState({});

  // const handleCurrentbook = (book) => {
  //   setCurrentBook(book);
  // };
  return (
    <div className="App">
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
          {/* <Route
            path="/signup"
            element={
              <SignUpPage
                handleUsername={handleUsername}
                useTitle={useTitle()}
              />
            }
          ></Route>
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
            path="/booklist"
            element={
              <BookListPage
                handleCurrentbook={handleCurrentbook}
                currentBook={currentBook}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
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
            path="/review/book"
            element={
              <SelectBookPage
                handleBookInfo={handleBookInfo}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            path="/reviewinput"
            element={
              <ReviewInputPage
                bookInfo={bookInfo}
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
    </div>
  );
}

export default App;
