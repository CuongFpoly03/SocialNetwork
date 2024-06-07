import { promisify } from "util";
import { IGroupMessage } from "../interfaces/Models/IGroupMessage";
import SocketIo from "../providers/SocketIo";
import CacheRedis from "../providers/Cache";
import { createClient } from "redis";
import mongoose from "mongoose";

class GroupMessageService {
  private redisClient: ReturnType<typeof createClient> | null = null;

  constructor() {
    new CacheRedis();
  }

  private async initializeRedisClient() {
    if (!this.redisClient) {
      this.redisClient = await CacheRedis.getClient();
    }
  }

  public async sendMessageToGroup(
    groupMessage_sender: string,
    groupMessage_content: string,
    groupMessage_read_by: string,
    groupMessage_group: (string | mongoose.Types.ObjectId)[]
  ): Promise<IGroupMessage> {
    await this.initializeRedisClient();
    if (!this.redisClient) {
      throw new Error("Redis client is not initialized");
    }

    const groupMessageGroupStrings = groupMessage_group.map((id) =>
      id instanceof mongoose.Types.ObjectId ? id.toHexString() : id
    );

    const groupMessage: any = {
      groupMessage_sender,
      groupMessage_content,
      groupMessage_read_by,
      groupMessage_group: groupMessageGroupStrings,
      groupMessage_createAt: new Date(),
    };

    const messageId = `groupMessage:${Date.now()}`;
    const groupKey = `group:${groupMessageGroupStrings[0]}:messages`;

    try {
      const setAsync = promisify(this.redisClient.set).bind(this.redisClient);
      const rPushAsync = promisify(this.redisClient.rPush).bind(
        this.redisClient
      );

      await setAsync(messageId, JSON.stringify(groupMessage));
      await rPushAsync(groupKey, messageId);

      SocketIo.getIo()
        .to(groupMessageGroupStrings[0])
        .emit("newGroupMessage", groupMessage);

      return groupMessage;
    } catch (error) {
      console.error("Error in sendMessageToGroup:", error);
      throw error;
    }
  }

  public async getGroupMessages(groupId: string): Promise<IGroupMessage[]> {
    await this.initializeRedisClient();

    if (!this.redisClient) {
      throw new Error("Redis client is not initialized");
    }

    const groupKey = `group:${groupId}:messages`;

    try {
      const lRangeAsync = promisify(this.redisClient.lRange).bind(
        this.redisClient
      );
      const getAsync = promisify(this.redisClient.get).bind(this.redisClient);

      const messageIds = await lRangeAsync(groupKey, 0, -1);
      const messages = await Promise.all(
        messageIds.map(async (messageId: string) => {
          const message = await getAsync(messageId);
          return message ? JSON.parse(message) : null;
        })
      );

      return messages.filter((message) => message !== null) as IGroupMessage[];
    } catch (error) {
      console.error("Error in getGroupMessages:", error);
      throw error;
    }
  }
}

export default new GroupMessageService();
