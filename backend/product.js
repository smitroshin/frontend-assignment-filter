const qs = require('qs');
const cache = require('memory-cache');
const pipe = require('../helpers/pipe').default;

if (process.env.NODE_ENV === 'development') cache.clear();

const CACHE_TIME = 24 * 1000 * 60 * 60;

const productItems = require('../data/miista-export.json').data
  .allContentfulProductPage.edges;

const applyFilters =
  (...cbs) =>
  (data) =>
    data.filter((itm) => cbs.every((cb) => cb(itm)));

const applyPagination = (page, nrPerPage) => (data) => {
  const beginIndex = page ? page * nrPerPage - nrPerPage : 0;
  const endIndex = beginIndex + nrPerPage;

  const result = data.slice(
    beginIndex,
    endIndex < data.length ? endIndex : beginIndex + data.length - beginIndex,
  );

  return {
    data: result,
    count: { dataCount: data.length, productsCount: productItems.length },
    pagination: {
      current: +page,
      total: Math.trunc(data.length / nrPerPage) + 1,
    },
  };
};

/**
 * Colors filter
 *
 * @param {Object} itm
 * @param {String} criteria
 * @returns {Boolean}
 */
const colorsFilter = (criteria) => (itm) => {
  if (!criteria) return true;

  const itmColors = itm.node.colorFamily;

  if (!itmColors) return false;

  return criteria.some((col) =>
    itmColors.some((itm2) => new RegExp(itm2.name, 'i').test(col)),
  );
};

/**
 * Category tags filter
 *
 * @param {Object} itm
 * @param {String[]} criteria
 * @returns {Boolean}
 */
const categoryTagsFilter = (criteria) => (itm) => {
  if (!criteria) return true;

  const itmCatTags = itm.node.categoryTags;

  if (!itmCatTags) return false;

  return criteria.some((cat) => itmCatTags.includes(cat));
};

/**
 * Price range filter
 *
 * @param {Object} itm
 * @param {[String, String]} criteria
 * @returns {boolean}
 */
const priceRangeFilter = (criteria) => (itm) => {
  if (!criteria) return true;

  const itmPrice = parseFloat(
    itm.node.shopifyProductEu.variants.edges[0].node.price,
  );

  const [startPrice, endPrice] = criteria.map((num) => parseFloat(num));

  return (
    itmPrice >= startPrice &&
    (itmPrice < endPrice ||
      (criteria.length === 3 && itmPrice >= parseFloat(criteria[1])))
  );
};

/**
 * Get all endpoint
 *
 * @param {import('next').NextApiRequest} req
 * @returns {Object[]}
 */
function getAll(req) {
  const { query } = req;
  const { page = 1, colors, priceRange, categoryTags } = qs.parse(query);
  const NR_OF_ITEMS_PER_PAGE = 12;

  const cacheKey = qs.stringify({
    ...query,
    NR_OF_ITEMS_PER_PAGE,
  });
  const cachedData = cache.get(cacheKey);

  if (cachedData) return cachedData;

  const data = pipe(
    applyFilters(
      colorsFilter(colors),
      categoryTagsFilter(categoryTags),
      priceRangeFilter(priceRange),
    ),
    applyPagination(page, NR_OF_ITEMS_PER_PAGE),
  )(productItems);

  cache.put(cacheKey, data, CACHE_TIME);

  return data;
}

/**
 * Get available colors endpoint
 */
function getAvailableColors() {
  const cachedData = cache.get('availableColors');

  if (cachedData) return cachedData;

  const data = productItems.reduce((acc, itm) => {
    if (itm.node.colorFamily)
      itm.node.colorFamily.forEach((c) => {
        if (!acc.includes(c.name)) acc.push(c.name);
      });
    return acc;
  }, []);

  cache.put('availableColors', data, CACHE_TIME);

  return data;
}

/**
 * Get available category tags endpoint
 */
function getAvailableCategoryTags() {
  const cachedData = cache.get('availableCategoryTags');

  if (cachedData) return cachedData;

  const data = productItems.reduce((acc, itm) => {
    if (itm.node.categoryTags)
      itm.node.categoryTags.forEach((tag) => {
        if (!acc.includes(tag)) acc.push(tag);
      });
    return acc;
  }, []);

  cache.put('availableCategoryTags', data, CACHE_TIME);

  return data;
}

/**
 * Product
 */
export default {
  getAll,
  getAvailableColors,
  getAvailableCategoryTags,
};
