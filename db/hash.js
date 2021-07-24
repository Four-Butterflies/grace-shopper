const bcrypt = require('bcrypt');
// Based on your folder structure, shouldnt this find its way into ../utils?

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(password, salt);
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, comparePasswords };
