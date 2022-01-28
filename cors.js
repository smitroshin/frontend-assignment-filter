import Cors from 'cors';
import initMiddleware from './helpers/initMiddleware';

/**
 * Initialize the cors middleware
 *
 * Source: https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.js
 */
const cors = initMiddleware(
  Cors({
    methods: ['GET'],
  }),
);

export default cors;
