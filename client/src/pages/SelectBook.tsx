import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { bookApi } from '../api';
import BookInfoBox from '../components/book/BookInfoBox';
import Modal from '../components/Modal';
import PageTitle from '../components/PageTitle';
import useTitle from '../hooks/useTitle';
import { Container } from './BookList';

const SelectBook = ({
  handleBookInfo,
  isLogin,
}: {
  handleBookInfo: (book: any) => void;
  isLogin: boolean;
}) => {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>({});
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  useTitle('북로그 도서 검색');
  useEffect(() => {
    if (search !== '') {
      searchBook(search);
    }
  }, [search]);

  const searchBook = async (title: string) => {
    try {
      const {
        data: { data },
      } = await bookApi.search(title);
      setBookList(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        const { response } = err as AxiosError;
        // todo 에러처리
        // if(response && response.status )
      }
    }
  };

  const handleChange = async (e: any) => {
    setSearch(e.target.value);
  };

  const clickHandler = (idx: any) => {
    setSelectedBook(bookList[idx]);
    setIsModal(true);
  };

  const buttonHandler = (type: any) => {
    if (type === 'back') {
      setIsModal(false);
    } else if (type === 'select') {
      handleBookInfo(selectedBook);
      navigate('/reviewinput');
    }
  };
  return (
    <>
      {isLogin ? (
        <Container>
          {isModal ? (
            <BookModal>
              <ModalContainer>
                <ModalContents>
                  <ModalCover
                    src={
                      selectedBook.thumbnail
                        ? selectedBook.thumbnail
                        : `https://via.placeholder.com/120x174.png?text=Book+Log`
                    }
                  />
                  <ModalInfo>
                    <ModalTitle>
                      {selectedBook.title} | {selectedBook.authors[0]} |{' '}
                      {selectedBook.publisher}
                    </ModalTitle>
                    <ModalDetail>{selectedBook.contents}...</ModalDetail>
                  </ModalInfo>
                </ModalContents>
                <ModalBtn>
                  <Button onClick={() => buttonHandler('back')}>
                    뒤로가기
                  </Button>
                  <Button onClick={() => buttonHandler('select')}>선택</Button>
                </ModalBtn>
              </ModalContainer>
            </BookModal>
          ) : null}
          <TitleContainer>
            <PageTitle>도서 선택</PageTitle>
          </TitleContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="도서 제목을 입력하세요."
              value={search}
              onChange={handleChange}
            />
          </SearchContainer>
          <BooksContainer>
            {bookList.length > 0
              ? bookList.map((book, idx) => {
                  return (
                    <BookInfoBox
                      book={book}
                      idx={idx}
                      clickHandler={clickHandler}
                    />
                  );
                })
              : '검색 결과가 없습니다.'}
          </BooksContainer>
        </Container>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')} className="btn">
            로그인 화면으로 이동
          </button>
        </BeforeLoginModal>
      )}
    </>
  );
};

export default SelectBook;

const BeforeLoginModal = styled(Modal)``;

const TitleContainer = styled.div`
  width: 100%;
`;

const SearchContainer = styled.div`
  padding: 1.5rem 0rem;
  text-align: center;
`;

const ContentContainer = styled.div`
  border-radius: 40px;
  height: 50rem;
  padding: 3rem;
`;

const BooksContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 2rem 2rem;
  height: 35rem;
  overflow-y: scroll;
  border-radius: 0.3rem;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    padding: 1px;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  width: 30rem;
  border-bottom: 2px solid #2a4a69;
  padding: 0.3rem 0.5rem;
  font-size: 1.3rem;
  outline: 0;
`;

const BookModal = styled(Modal)``;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ModalContents = styled.div`
  display: flex;
`;
const ModalBtn = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const ModalInfo = styled.div`
  width: 40rem;
`;

const ModalTitle = styled.div`
  padding-bottom: 1rem;
  font-weight: 600;
`;

const ModalDetail = styled.div``;

const ModalCover = styled.img`
  padding-right: 1rem;
  width: 10rem;
`;

const Button = styled.button`
  width: 6rem;
  margin-right: 4rem;
  padding: 0.3rem 0.7rem;
  background-color: #0b3961;
  border-radius: 0.2rem;
  text-decoration: none;
  line-height: 1.5rem;
  color: white;
  border: none;
`;
