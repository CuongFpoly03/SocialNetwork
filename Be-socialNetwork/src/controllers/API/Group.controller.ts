import { Request, Response } from "express";
import GroupService from "../../services/Group.service";
import { SuccessResponse } from "../../cores/success.response";

class GroupController {
  // Phương thức tạo nhóm mới
  public async createGroup(req: Request, res: Response): Promise<any> {
    try {
      const { group_name, group_members } = req.body;

      // Kiểm tra xem các trường group_name và group_members có tồn tại không
      if (!group_name || !group_members) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      // Gọi phương thức createGroup từ GroupService để tạo nhóm mới
      const group = await GroupService.createGroup(group_name, group_members);

      // Trả về phản hồi thành công với thông điệp "Tạo nhóm thành công" và dữ liệu nhóm đã được tạo
      return new SuccessResponse({
        message: "Tạo nhóm thành công",
        metadata: group,
      }).send(res);
    } catch (error) {
      // Xử lý lỗi nếu có
      return res.status(500).json({ message: "Error creating group", error });
    }
  }

  // Phương thức thêm thành viên vào nhóm
  public async addMember(req: Request, res: Response): Promise<any> {
    try {
      const { groupId, memberCount } = req.body;

      // Kiểm tra xem các trường groupId và memberCount có tồn tại không
      if (!groupId || !memberCount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      // Gọi phương thức addMember từ GroupService để thêm thành viên vào nhóm
      const group = await GroupService.addMember(groupId, memberCount);
      // Trả về phản hồi thành công với thông điệp "Thêm thành viên vào nhóm thành công" và dữ liệu nhóm đã được cập nhật
      return new SuccessResponse({
        message: "Thêm thành viên vào nhóm thành công",
        metadata: group,
      }).send(res);
    } catch (error) {
      // Xử lý lỗi nếu có
      return res
        .status(500)
        .json({ message: "Error adding member to group", error });
    }
  }
}

export default new GroupController();
