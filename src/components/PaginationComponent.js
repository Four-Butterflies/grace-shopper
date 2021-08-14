import React, { useState } from 'react';
import { Container, Row, Pagination } from 'react-bootstrap';

const PaginationComponent = ({ albumsPerPage, totalAlbums, paginate }) => {
  const [active, setActive] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlbums / albumsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === active}
              onClick={(event) => {
                event.preventDefault();
                setActive(number);
                paginate(number);
                window.scrollTo(0, 0);
              }}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
};

export default PaginationComponent;
