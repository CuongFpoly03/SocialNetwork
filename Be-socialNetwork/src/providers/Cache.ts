// cách2
// import Redis, { Redis as RedisInstance } from 'ioredis';
// import Log from "../middlewares/Log";
// import Locals from "./Local";
// import { Application } from "express";
// cách1
import { createClient } from "redis";

class CacheRedis {
  private static client: ReturnType<typeof createClient> | null = null;
  private static isConnected = false;
  private static connectPromise: Promise<void>;

  constructor() {
    if (!CacheRedis.client) {
      CacheRedis.client = createClient({
        url: "redis://redis-10865.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com:10865",
        password: "M2Lrkw0DIBfJjttQWTHyuK4Y0hVo1iZw",
      });

      CacheRedis.client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      CacheRedis.connectPromise = CacheRedis.client.connect().then(() => {
        console.log("Connected to Redis");
        CacheRedis.isConnected = true;
      }).catch((err) => {
        console.error("Could not connect to Redis", err);
        CacheRedis.isConnected = false;
      });
    }
  }

  public static getClient() {
    if (!CacheRedis.client || !CacheRedis.isConnected) {
      throw new Error("Redis client is not initialized");
    }
    return CacheRedis.client;
  }

  public static getConnectPromise() {
    return CacheRedis.connectPromise;
  }
}

export default CacheRedis;



// cách 2
// class CacheRedis {
//     private static instance: RedisInstance | undefined;
//     //tạo một kết nối đến Redis server.
//     public static init() {
//         Log.showLogs("connect CacheRedis success !");
//         if (!this.instance) {
//             this.instance = new Redis({
//                 host: Locals.config().url,
//                 port: Locals.config().port,
//                 password: Locals.config().password,
//             });

//             this.instance.on('connect', () => {
//                 console.log('Connected to Redis');
//             });

//             this.instance.on('error', (err) => {
//                 console.error('Redis error:', err);
//             });
//         }
//     }
//     public static getInstance(): RedisInstance {
//         if (!this.instance) {
//             throw new Error('CacheRedis not initialized. Call CacheRedis.init() first.');
//         }
//         return this.instance;
//     }
//     //Lấy giá trị từ Redis.
//     public static async get(key: string): Promise<string | null> {
//         return this.getInstance().get(key);
//     }
//     // Lưu trữ giá trị vào Redis, với tùy chọn thời gian sống (TTL).
//     public static async set(key: string, value: string, ttl?: number): Promise<void> {
//         if (ttl) {
//             await this.getInstance().set(key, value, 'EX', ttl);
//         } else {
//             await this.getInstance().set(key, value);
//         }
//     }
//     // Xóa giá trị khỏi Redis.
//     public static async delete(key: string): Promise<number> {
//         return this.getInstance().del(key);
//     }
//     //Đóng kết nối với Redis.
//     public static close(): void {
//         if (this.instance) {
//             this.instance.quit();
//             this.instance = undefined;
//         }
//     }
// }

// export default CacheRedis;
