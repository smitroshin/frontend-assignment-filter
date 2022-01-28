import API from '../../../backend/api';

export default function handler(req, res) {
  const data = API.product.getAvailableCategoryTags();

  res.status(200).json(data);
}
