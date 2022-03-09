import { AnyMxRecord } from 'dns';
import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCover({
  book,
  handleCurrentbook,
}: {
  book: any;
  handleCurrentbook?: any;
}) {
  return (
    <div className="bookCard" onClick={() => handleCurrentbook(book)}>
      <div style={{ flex: 3 }}>
        <img src={book.thumbnail} alt="" />
      </div>
    </div>
  );
}
