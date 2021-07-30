const express = require('express');
const usersRouter = express.Router();
const { createJWT } = require('../utils');
const {
  getAllUsers,
  createUser,
  getUserByEmailAndPassword,
  getUserByEmail,
} = require('../db/users.js');

usersRouter.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      res.status(400).send({
        name: 'UserExistsError',
        message: 'A user by that username already exists.',
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
      const token = createJWT(user.email, user.id, user.username);

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

module.exports = usersRouter;
