import rateLimit from "../config/upstash.js";

/**
 * Get the IP address of the client from the request.
 * If the request contains the X-Forwarded-For header, use that.
 * Otherwise, use the `req.ip` property.
 * @param {Object} req - The HTTP request object.
 * @returns {string} The IP address of the client.
 */
const getIp = (req) => {
  const xfwd = req.headers["x-forwarded-for"];
  return xfwd ? xfwd.split(",")[0].trim() : req.ip;
};

/**
 * Middleware function to enforce rate limiting using Upstash Ratelimit.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 */
const rateLimiter = async (req, res, next) => {
  try {
    const key = getIp(req);
    const { success, remaining, reset } = await rateLimit.limit(key);

    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
