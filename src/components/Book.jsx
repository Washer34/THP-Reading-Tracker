import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Book = ({ title, shortDescription, thumbnailUrl, isFav, read, handleFav, handleWish }) => {

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={thumbnailUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {shortDescription}
        </Card.Text>
        <Button variant="success" onClick={handleFav}>{isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}</Button>
        <Button variant="primary" onClick={handleWish}>{read ? 'Retirer des souhaits' : 'Ajouter aux souhaits'}</Button>
      </Card.Body>
    </Card>
  );
}

export default Book;
