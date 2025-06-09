import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';
import "dotenv/config";

//now craete a limiter

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests every 10 seconds
})

export default ratelimit;