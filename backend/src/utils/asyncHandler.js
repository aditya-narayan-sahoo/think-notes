/**
 * A middleware to handle async functions and pass errors to the next middleware.
 * @param {Function} fn - The async function to handle.
 * @returns {Function} A function that takes req, res, and next as arguments.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
