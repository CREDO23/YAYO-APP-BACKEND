const { expressjwt: express_Jwt } = require('express-jwt');
const dotenv = require('dotenv');
dotenv.config();

module.exports = express_Jwt({
  secret: process.env.PRIVATE_SECRET,
  algorithms: ['HS256'],
}).unless({
  path: [
    '/login',
    '/customers/create',
    '/tickets',
    '/ticketCategories',
    '/products',
  ],
});
