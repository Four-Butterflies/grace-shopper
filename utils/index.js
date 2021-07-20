const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const createJWT = (email, id, username) => {
  const token = jwt.sign(
    {
      email,
      id,
      username,
    },
    JWT_SECRET,
    { expiresIn: '1w' }
  );

  return token;
};

const verifyJWT = (authHeader) => {
  const [, token] = authHeader.split('Bearer ');
  const validatedToken = jwt.verify(token, JWT_SECRET);

  if (!validatedToken) return null;

  return validatedToken;
};

const authMiddleware = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const decodedToken = verifyJWT(authHeader);
      req.user = decodedToken;
    } catch (error) {
      console.log(`Invalid JWT provided in header.`);
    }
  }
  next();
};

module.exports = {
  createJWT,
  verifyJWT,
  authMiddleware,
};