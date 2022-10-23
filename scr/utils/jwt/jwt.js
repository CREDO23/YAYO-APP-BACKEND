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

const singUpdatePasswordToken = async (userName) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userName },
      process.env.RESET_PASSWORD_SECRET,
      {
        expiresIn: 60 * 5,
      },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      },
    );
  });
};

module.exports = {
  singAccessToken,
  singUpdatePasswordToken,
};
