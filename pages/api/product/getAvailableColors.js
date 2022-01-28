import API from '../../../backend/api';
import cors from '../../../cors';

export default async function handler(req, res) {
  await cors(req, res);

  const data = API.product.getAvailableColors();

  res.status(200).json(data);
}
