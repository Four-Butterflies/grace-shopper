const client = require("./client");

// database methods

async function createUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, email)
        VALUES($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username, email;
      `,
      [username, password, email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser };
