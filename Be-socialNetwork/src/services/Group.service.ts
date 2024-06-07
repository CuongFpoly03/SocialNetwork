import Group, { IGroup } from '../models/Group.model'; // Import model Group và giao diện IGroup
class GroupService {
  [x: string]: any;
  // Phương thức tạo nhóm mới
  public async createGroup(groupName: string, members: number): Promise<IGroup> {
    const group = new Group({
      group_name: groupName, // Tên nhóm
      group_members: members, // Số thành viên
      group_createAt: new Date(), // Ngày tạo nhóm
      group_updateAt: new Date(), // Ngày cập nhật nhóm lần cuối
    });
    return group.save(); // Lưu nhóm vào cơ sở dữ liệu và trả về kết quả
  }

  // Phương thức thêm thành viên vào nhóm
  public async addMember(groupId: string, memberCount: number): Promise<IGroup> {
    const group = await Group.findById(groupId).exec() as IGroup; // Tìm nhóm theo ID và ép kiểu sang IGroup
    if (!group) {
      throw new Error('Group not found'); // Nếu không tìm thấy nhóm, ném ra lỗi
    }
    group.group_members += memberCount; // Cộng số thành viên mới vào tổng số thành viên
    group.group_updateAt = new Date(); // Cập nhật ngày cập nhật nhóm

    return group.save(); // Lưu thay đổi vào cơ sở dữ liệu và trả về kết quả
  }
}

export default new GroupService();
