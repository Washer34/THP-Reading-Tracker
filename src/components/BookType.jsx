import React, { useEffect, useState } from 'react';
import Book from './Book';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const BookType = () => {
  const [bookList, setBookList] = useState([]);
  const [filteredBookList, setFilteredBookList] = useState(bookList);
  const [filterValue, setFilterValue] = useState([]);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/MathisDYKDan/76bc73ec77481ccb82677cc7c0d8b524/raw/a23c99027b9bfc1bfdb22e22ddcb4301a5f870ee/books.json')
      .then((response) => response.json())
      .then((data) => {
        setBookList(data.books.flat());
        setFilteredBookList(data.books.flat());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (filterValue.length === 0) {
      setFilteredBookList(bookList);
    } else {
      const filteredBooks = bookList.filter(book => {
        const isFav = filterValue.includes(1);
        const isWish = filterValue.includes(2);
        if (isFav && isWish) {
          return book.isFav && book.read;
        } else if (isFav) {
          return book.isFav
        } else if (isWish) {
          return book.read
        }
      });
      setFilteredBookList(filteredBooks);
    }

  }, [filterValue, bookList]);

  const handleFav = (index) => {
    const updatedFilteredBookList = [...filteredBookList];
    updatedFilteredBookList[index].isFav = !updatedFilteredBookList[index].isFav;
    setFilteredBookList(updatedFilteredBookList);
  }

  const handleWish = (index) => {
    const updatedFilteredBookList = [...filteredBookList];
    updatedFilteredBookList[index].read = !updatedFilteredBookList[index].read;
    setFilteredBookList(updatedFilteredBookList);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target[0].value
    const filteredBooks = bookList.filter(book => book.title.toLowerCase().includes(input.toLowerCase()));
    setFilteredBookList(filteredBooks);
  }

  const handleChange = (val) => {
    setFilterValue(val);
  };

  return (
    <div>
      <ToggleButtonGroup type="checkbox" value={filterValue} onChange={handleChange}>
        <ToggleButton id="tbg-btn-1" value={1}>
          Favoris
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={2}>
          Souhaits
        </ToggleButton>
      </ToggleButtonGroup>
      <p>Filters selected: {JSON.stringify(filterValue)}</p>
      <div className="SearchBar">
        <form onSubmit={handleSubmit}>
          <label>
            Rechercher:
            <input type="text" placeholder='Entrer un titre' />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
      </div>
      <div className="d-flex flex-wrap">
        {filteredBookList.flat().map((book, index) => (
          <Book
            key={index}
            {...book}
            handleFav={() => handleFav(index)}
            handleWish={() => handleWish(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookType;
