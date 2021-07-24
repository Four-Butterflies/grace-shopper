const client = require('./client');

async function createAlbumUnit(albumId, userId, strikePrice) {
    try {
        const {
            rows: [albumUnit],
          } = await client.query(
            `
              INSERT INTO album_units("albumId", "userId", strike_price)
              VALUES($1, $2, $3)
              RETURNING *;
            `,
            [
              albumId,
              userId,
              strikePrice
            ]
          );
        
        return albumUnit
    } catch(error) {
        throw error
    }
}

async function deleteAlbumUnit(albumUnitId) {
    try {
        const { rows: [albumUnit] } = await client.query(`
            DELETE FROM album_units
            WHERE id = $1
        `, [albumUnitId]);

        return albumUnit
    } catch(error) {
        throw error
    }
}

module.exports = { createAlbumUnit, deleteAlbumUnit }