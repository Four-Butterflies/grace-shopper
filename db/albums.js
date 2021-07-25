const client = require('./client.js');
// database methods

async function getAlbums() {
  try {
    const { rows } = await client.query(
      `
    SELECT * FROM albums;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAlbumByID(id) {
  try {
    const {
      rows: [album],
    } = await client.query(
      `
    SELECT * FROM albums
    WHERE id = $1;
    `,
      [id]
    );

    return album;
  } catch (error) {
    throw error;
  }
}

async function createAlbums({
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
}) {
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
  try {
    const {
      rows: [albums],
    } = client.query(
      `
      SELECT * FROM albums
      WHERE name LIKE $1;
    `,
      [`%${name}%`]
    );

    return albums;
  } catch (error) {
    throw error;
  }
}

async function getAlbumsByArtist(artist) {
  try {
    const {
      rows: [albums],
    } = client.query(
      `
      SELECT * FROM albums
      WHERE artists LIKE $1;
    `,
      [`%${artist}%`]
    );

    return albums;
  } catch (error) {
    throw error;
  }
}

// async function getAlbumsByGenre(genre) {

// }

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
  editAlbum,
  deleteAlbum,
};
