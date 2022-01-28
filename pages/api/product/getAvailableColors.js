import API from '../../../backend/api';

export default function handler(req, res) {
  const data = API.product.getAvailableColors();

  res.status(200).json(data);
}
