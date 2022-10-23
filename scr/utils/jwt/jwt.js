const jwt = require('jsonwebtoken');

const singAccessToken = (id, role) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id, role },
      process.env.PRIVATE_SECRET,
      {
        expiresIn: '2 days',
      },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      },
    );
  });
};

const singUpdatePasswordToken = () => {};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PRIVATE_SECRET, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};

module.exports = {
  singAccessToken,
  verifyToken,
  singUpdatePasswordToken,
};
