import dotenv from "dotenv";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

dotenv.config();

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "120 s"),
});

export default rateLimit;
