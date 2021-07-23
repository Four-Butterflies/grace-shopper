const bcrypt = require('bcrypt');

const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hash, comparePasswords };
