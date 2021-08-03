const client = require('./client.js');

async function getAlbums() {
  try {
    const { rows } = await client.query(`SELECT * FROM albums;`);

    const albumsWithReviews = await addReviewsToAlbum(rows);
    return albumsWithReviews;
  } catch (error) {
    throw error;
  }
}

async function createAlbums(albumToCreate) {
  const {
    name,
    artists,
    release_date,
    genres,
    price,
    quantity,
    reorder,
    image,
    total_tracks,
    spotify,
  } = albumToCreate;

  try {
    const {
      rows: [album],
    } = await client.query(
      `
        INSERT INTO albums(album_name, artist, year, genres, price, quantity, reorder_number, img_url, total_tracks, spotify)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
      `,
      [
        name,
        artists,
        release_date,
        genres,
        price,
        quantity,
        reorder,
        image,
        total_tracks,
        spotify,
      ]
    );

    return album;
  } catch (error) {
    throw error;
  }
}

async function getAlbumsByName(name) {
  console.log(name);
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM albums
        WHERE album_name ILIKE $1;
      `,
      [`%${name}%`]
    );

    const albumsWithReviews = await addReviewsToAlbum(rows);
    return albumsWithReviews;
  } catch (error) {
    throw error;
  }
}

async function getAlbumsByArtist(artist) {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM albums
        WHERE artist ILIKE $1;
      `,
      [`%${artist}%`]
    );

    const albumsWithReviews = await addReviewsToAlbum(rows);
    return albumsWithReviews;
  } catch (error) {
    throw error;
  }
}

async function getAlbumByID(id) {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM albums
        WHERE id = $1;
      `,
      [id]
    );

    const albumsWithReviews = await addReviewsToAlbum(rows);
    return albumsWithReviews;
  } catch (error) {
    throw error;
  }
}

async function getReviewsForAlbum(albumId) {
  try {
    const { rows } = await client.query(
      `
        SELECT r.id, r.review, r.rating, r.date, r."userId"
        FROM albums a
        JOIN reviews r ON a.id = r."albumId"
        WHERE a.id = $1;
      `,
      [albumId]
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addReviewsToAlbum(albums) {
  try {
    const result = Promise.all(
      albums.map(async (album) => {
        const reviews = await getReviewsForAlbum(album.id);
        return {
          ...album,
          reviews,
        };
      })
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getMostRecentAlbums() {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM albums
        ORDER BY year DESC
        LIMIT 12;
      `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllGenres() {
  try {
    const { rows } = await client.query(`SELECT genres FROM albums;`);

    const result = [];

    rows.forEach((row) => {
      row.genres.forEach((genre) => {
        if (!result.includes(genre)) {
          result.push(genre);
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
}

async function getAlbumsByGenre(genre) {
  try {
    const { rows } = await client.query(
      `
        SELECT * FROM albums
        WHERE genres @> $1;
      `,
      [genre]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function editAlbum(id, fields = {}) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
  );

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [album],
    } = await client.query(
      `
        UPDATE albums
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return album;
  } catch (error) {
    throw error;
  }
}

async function deleteAlbum(id) {
  try {
    const {
      rows: [album],
    } = await client.query(
      `
        DELETE FROM albums
        where id=$1
      `,
      [id]
    );

    return album;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAlbums,
  getAlbumByID,
  createAlbums,
  getAlbumsByName,
  getAlbumsByArtist,
  getMostRecentAlbums,
  getAllGenres,
  getAlbumsByGenre,
  editAlbum,
  deleteAlbum,
};
