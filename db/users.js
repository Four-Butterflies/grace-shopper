const client = require('./client');
const { hash, comparePasswords } = require('./hash.js');

// CREATING THE USER
const createUser = async ({ username, password, email }) => {
  const hashedPassword = hash(password);
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
      [username, hashedPassword, email]
    );

    return user;
  } catch (error) {
    throw error;
  }
};

// GETTING THE USER WITH EMAIL AND PASSWORD - log in.
const getUserByEmailAndPassword = async ({ email, password }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
     SELECT id, username, password FROM users WHERE email=$1 LIMIT 1;
    `,
      [email]
    );

    if (!user) return false;

    const passwordMatch = comparePasswords(password, user.password);

    if (!passwordMatch) return false;

    return { id: user.id, email: user.email, username: user.username };

  } catch (error) {
    throw error;
  }
};

// GETTING THE USER BY ID
// do NOT return the password
const getUserById = async (id) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username, email
            FROM users
            WHERE id=$1;
        `,
      [id]
    );

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// select a user using the user's email. Return the user object.
const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username, email
            FROM users
            WHERE email=$1;
        `,
      [email]
    );

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    throw error;
  }
};

// Get userName to check if user exist prior to sign up
const getUserByUsername = async (username) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, username 
            FROM users WHERE username=$1`,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const { rows } = await client.query(`
        SELECT * FROM users;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmailAndPassword,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  getAllUsers,
};
