import { createClient } from "redis";
import CacheRedis from "../providers/Cache";
import SocketIo from "../providers/SocketIo";
import { IMessage } from "../interfaces/Models/IMessage";
import Conversation from "../models/Conversation.model";
import Message from "../models/Mesage.model";
import { promisify } from "util";

class MessageService {
  [x: string]: any;
  private redisClient: ReturnType<typeof createClient> | null = null;

  constructor() {
    new CacheRedis(); // Initialize the Redis client
  }

  private async initializeRedisClient() {
    if (!this.redisClient) {
      this.redisClient = await CacheRedis.getClient();
    }
  }

  public async sendMessage(message: IMessage): Promise<void> {
    await this.initializeRedisClient();
    if (!this.redisClient) {
      throw new Error("Redis client is not initialized");
    }

    const { message_content, message_sender, message_receiver } = message;

    try {
      let conversation = await Conversation.findOne({
        conversation_participants: { $all: [message_sender, message_receiver] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          conversation_participants: [message_sender, message_receiver],
          messages: [],
        });
      }

      const newMessage = new Message({
        message_content,
        message_sender,
        message_receiver,
        message_read_status: "unread",
        message_conversation: conversation._id,
      });

      conversation.conversation_messages.push(newMessage._id);

      await Promise.all([conversation.save(), newMessage.save()]);

      const messageId = this.generateId();
      await this.redisClient.set(
        `message:${messageId}`,
        JSON.stringify(newMessage)
      );
      await this.redisClient.lPush(
        `conversation:${conversation._id}:messages`,
        messageId
      );

      const receiverSocketId = SocketIo.getReaceiverSocketId(message_receiver);
      if (receiverSocketId) {
        SocketIo.getIo().to(receiverSocketId).emit("newMessage", newMessage);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  }

  public async getMessages(conversationId: string): Promise<IMessage[]> {
    await this.initializeRedisClient();
    if (!this.redisClient) {
      throw new Error("Redis client is not initialized");
    }

    try {
      console.log(
        `Fetching message IDs for conversation:${conversationId}:messages`
      );

      const lRangeAsync = promisify(this.redisClient.LRANGE).bind(
        this.redisClient
      );
      const messageIds = await lRangeAsync(
        `conversation:${conversationId}:messages`,
        0,
        -1
      );
      console.log(`Message IDs: ${messageIds}`);

      const getAsync = promisify(this.redisClient.GET).bind(this.redisClient);
      const messages = await Promise.all(
        messageIds.map(async (messageId: string) => {
          const message = await getAsync(`message:${messageId}`);
          console.log(`Fetched message for ID ${messageId}: ${message}`);
          return message ? JSON.parse(message) : null;
        })
      );

      const filteredMessages = messages.filter(
        (message) => message !== null
      ) as IMessage[];
      console.log(`Filtered messages: ${JSON.stringify(filteredMessages)}`);
      return filteredMessages;
    } catch (error) {
      console.error("Error in getMessages:", error);
      throw error;
    }
  }
  private generateId(): string {
    return Date.now().toString();
  }
}

export default new MessageService();
