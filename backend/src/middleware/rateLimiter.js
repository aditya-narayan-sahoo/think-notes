import rateLimit from "../config/upstash.js";

/**
 * A middleware to limit the number of incoming requests using Upstash's
 * rate limiter.
 *
 * @function rateLimiter
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware in the stack.
 * @throws {Error} If the rate limit is exceeded, a 429 error is thrown.
 * @throws {Error} If there is an error with the rate limiter, the error is
 *   re-thrown.
 */
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-rate-limit");
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later" });
    }
    next();
  } catch (error) {
    console.error(`Rate limit error: ${error.message}`);
    next(error);
  }
};

export default rateLimiter;
