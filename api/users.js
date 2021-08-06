const express = require('express');
const usersRouter = express.Router();
const { createJWT, verifyJWT } = require('../utils');
const {
  getAllUsers,
  createUser,
  getUserByEmailAndPassword,
  getUserByEmail,
  getUserByUsername,
  getUserById,
} = require('../db/users.js');

// First admin only route :D
usersRouter.get('/', async (req, res) => {
  const user = verifyJWT(req.headers.authorization);

  if (user.isAdmin) {
    try {
      const users = await getAllUsers();

      return res.send({ users });
    } catch (error) {
      console.log(error);
    }
  }

  res.send(':P');
});

usersRouter.get('/whoami', (req, res) => {
  if (req.user) {
    res.send({
      user: req.user,
    });
  } else {
    res.status(401).send({
      message: 'You are not a signed in or authenticated user.',
    });
  }
});

// Helper route to check if a user is an admin
usersRouter.get('/admin', (req, res) => {
  const user = verifyJWT(req.headers.authorization);

  if (user.isAdmin) {
    return res.send(true);
  }

  res.send(false);
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const result = getUserById(id);

    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  if (Object.keys(req.body).length < 3) {
    return res.status(400).send({
      name: 'CredentialsRequired',
      message: 'Please provide email, username and password to register.',
    });
  }

  const { username, password, email } = req.body;

  try {
    const existingUserByEmail = await getUserByEmail(email);
    const existingUserUsername = await getUserByUsername(username);

    if (existingUserByEmail) {
      return res.status(400).send({
        name: 'EmailExistsError',
        message: 'A user under that email already exists.',
      });
    }

    if (existingUserUsername) {
      return res.status(400).send({
        name: 'UserExistsError',
        message: 'A user under that username already exists.',
      });
    }

    if (password.length < 5 || !password) {
      return res
        .status(406)
        .send({ message: 'Password must be at least 5 characters long' });
    }

    const user = await createUser({ username, password, email });

    const token = createJWT(user.email, user.id, user.username);

    res.send({
      user: { id: user.id, username: user.username },
      message: 'Thank you for signing up',
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/login', async (req, res, next) => {
  if (Object.keys(req.body).length < 2) {
    return res.status(400).send({
      name: 'CredentialsRequired',
      message: 'Please provide email and password to login.',
    });
  }

  const { email, password } = req.body;

  if (!email || !password || password.length < 5) {
    res.status(400).send({
      name: 'MissingCredentialsError',
      message: 'Please supply both a username and password',
    });
    next();
  }

  try {
    const user = await getUserByEmailAndPassword({ email, password });
    if (!user) {
      res.status(401).send({ message: 'User not found.' });
    }

    if (user === false) {
      res.status(400).send({
        name: 'IncorrectCredentialsError',
        message: 'Email or password is incorrect',
      });
    }

    if (user) {
      const token = createJWT(user.email, user.id, user.username, user.isAdmin);

      res.send({
        user: { id: user.id, username: user.username },
        message: `You are logged in ${user.username}!`,
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// TODO
usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
});

module.exports = usersRouter;
