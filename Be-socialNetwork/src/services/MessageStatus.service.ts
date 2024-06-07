import { createClient } from "redis";
import CacheRedis from "../providers/Cache";

class MessageStatusService {
  private redisClient: ReturnType<typeof createClient> | null = null;
  constructor() {
    new CacheRedis();
  }

  private async initalizeRedisClient() {
    if (!this.redisClient) {
      this.redisClient = await CacheRedis.getClient();
    }
  }
  public async createMessageStatus() {}
}
export default MessageStatusService;
