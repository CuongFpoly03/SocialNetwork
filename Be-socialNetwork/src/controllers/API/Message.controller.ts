import { Request, Response } from "express";
import { IMessage } from "../../interfaces/Models/IMessage";
import { SuccessResponse } from "../../cores/success.response";
import MessageService from "../../services/Message.service";

class MessageController {
  // Phương thức gửi tin nhắn
  public static async sendMessages(req: Request, res: Response): Promise<any> {
    const message: IMessage = req.body;
    await MessageService.sendMessage(message);
    return new SuccessResponse({
      message: "Send message successfully",
      metadata: message,
    }).send(res);
  }

  // Phương thức lấy tin nhắn
  public static async getMessages(req: Request, res: Response): Promise<any> {
    try {
      const { conversationId } = req.params;
      console.log(`Fetching messages for conversationId: ${conversationId}`); // Logging để kiểm tra giá trị conversationId
      const messages = await MessageService.getMessages(conversationId);
      console.log(`Fetched messages: ${JSON.stringify(messages)}`); // Logging để kiểm tra giá trị messages

      return new SuccessResponse({
        message: "Get message successfully",
        metadata: messages,
      }).send(res);
    } catch (error) {
      console.error("Error in getMessages controller:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default MessageController;
