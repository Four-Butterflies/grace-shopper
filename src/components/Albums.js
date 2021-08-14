import React, { useState } from 'react';

import { PaginationComponent, SingleAlbum } from '.';

const Albums = ({ allAlbums }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalAlbums = allAlbums.length;
  const albumsPerPage = 24; // A lot of things are divisible by 24, it's a good number!

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = allAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '100%',
          justifyContent: 'space-around',
          padding: '1rem',
        }}
      >
        {currentAlbums.map((album) => {
          return <SingleAlbum key={album.id} album={album} />;
        })}
      </div>
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationComponent
          albumsPerPage={albumsPerPage}
          totalAlbums={totalAlbums}
          paginate={paginate}
        />
      </span>
    </>
  );
};

export default Albums;
