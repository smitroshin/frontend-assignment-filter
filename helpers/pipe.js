/**
 * Compose functions from left to right.
 *
 * Source: https://1loc.dev/#compose-functions-from-left-to-right
 *
 * Read more by googling: "js pipe", "js pipeline", "js compose from left to right".
 *
 * @param  {...function} fns
 * @returns {*}
 */
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

export default pipe;
