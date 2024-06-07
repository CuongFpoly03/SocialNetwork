import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/success.response";
import GroupMessageService from "../../services/GroupMesage.service";
import { IGroupMessage } from "../../interfaces/Models/IGroupMessage";

class GroupMessageController {
  public async sendGroupMessage(req: Request, res: Response): Promise<any> {

    try {
      console.log(req.body)
      const groupMessage: IGroupMessage = req.body;
      // console.log(req.body);

      if (
        !groupMessage.groupMessage_sender ||
        !groupMessage.groupMessage_content ||
        !groupMessage.groupMessage_read_by ||
        !groupMessage.groupMessage_group ||
        groupMessage.groupMessage_group.length === 0
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const message = await GroupMessageService.sendMessageToGroup(
        groupMessage.groupMessage_sender,
        groupMessage.groupMessage_content,
        groupMessage.groupMessage_read_by,
        groupMessage.groupMessage_group
      );

      return new SuccessResponse({
        message: "Message sent successfully",
        metadata: message,
      }).send(res);
    } catch (error) {
      console.error("Error sending message to group:", error);
      return res.status(500).json({ message: "Error sending message to group", error });
    }
  }

  public async getGroupMessages(req: Request, res: Response): Promise<any> {
    try {
      const { groupId } = req.params;
      if (!groupId) {
        return res.status(400).json({ message: "Missing groupId parameter" });
      }

      const messages = await GroupMessageService.getGroupMessages(groupId);

      if (!messages) {
        return res.status(404).json({ message: "Group messages not found" });
      }

      return new SuccessResponse({
        message: "Fetched group messages successfully",
        metadata: messages,
      }).send(res);
    } catch (error) {
      console.error("Error retrieving group messages:", error);
      return res.status(500).json({ message: "Error retrieving group messages", error });
    }
  }
}

export default new GroupMessageController();
