import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { bookApi } from '../../api';

const ReviewInput = ({
  bookInfo,
  info,
  bookId,
}: {
  bookInfo: any;
  info: any;
  bookId: any;
}) => {
  const today = new Date();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewContent, setReviewContent] = useState({
    content: info ? info.review : '',
    page: info ? info.page : '',
  });
  const reviewInputValue = (key: any) => (e: any) => {
    setReviewContent({ ...reviewContent, [key]: e.target.value });
  };
  const writeReview = async () => {
    let regExp = /[^0-9]/g;
    let number = String(reviewContent.page).replace(regExp, '');

    if (String(reviewContent.page) !== number) {
      setErrorMessage('페이지수는 숫자로만 입력해야합니다.');
    } else if (!reviewContent.page || !reviewContent.content) {
      setErrorMessage('페이지수와 감상 내용 모두 입력해야합니다.');
    } else {
      if (info) {
        try {
          // todo 기록 수정 리팩토링
          const result = await bookApi.edit(info.book_id, reviewContent);
          navigate('/booklist/reviewlist', {
            state: { book_id: bookId },
          });
        } catch (err: unknown) {
          // todo 에러처리
          if (err instanceof Error) {
            const { response } = err as AxiosError;
            if (response && response.status) {
              setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
            }
          }
        }
      } else {
        try {
          // todo 새 기록 작성 리팩토링
          const result = await bookApi.write(bookInfo, reviewContent);
          navigate('/booklist/reviewlist', {
            state: { book_id: result.data.data.book_id },
          });
        } catch (err: unknown) {
          // todo 에러처리
          if (err instanceof Error) {
            const { response } = err as AxiosError;
            if (response && response.status) {
              setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
            }
          }
        }
      }
    }
  };
  return (
    <ReviewInputContainer>
      <DateContainer>
        <span
          className="date-time"
          style={{ fontSize: '1rem', fontWeight: 'bold' }}
        >
          {today.toLocaleDateString()}
        </span>
        <PageInput>
          페이지수
          <input
            type="text"
            onChange={reviewInputValue('page')}
            id="page-input"
            style={{ width: '7vw' }}
            value={reviewContent.page}
          />
        </PageInput>
      </DateContainer>
      <WritingContainer
        className="review-input"
        placeholder="책을 읽고 느낌 감상을 자유롭게 남겨주세요."
        onChange={reviewInputValue('content')}
      >
        {reviewContent.content}
      </WritingContainer>
      <button className="btn" onClick={writeReview} style={{ width: '6vw' }}>
        저장
      </button>
      <div className="alert-box">{errorMessage}</div>
    </ReviewInputContainer>
  );
};

export default ReviewInput;

const ReviewInputContainer = styled.div`
  background-color: #9fb7cd;
  border-radius: 10px;
  height: 25rem;
  margin: auto;
  padding: 2rem;
  margin-top: 1rem;
`;

const DateContainer = styled.div`
  height: 5vh;
  font-size: 0.8rem;
`;
const WritingContainer = styled.textarea`
  width: 100%;
  height: 15rem;
  font-size: 1rem;
`;
const PageInput = styled.div`
  float: right;
`;
