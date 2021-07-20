const bcrypt = require('bcrypt');

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hash(password, salt);
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { hash, comparePasswords };
