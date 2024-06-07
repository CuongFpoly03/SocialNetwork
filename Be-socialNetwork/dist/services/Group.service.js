"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Group_model_1 = __importDefault(require("../models/Group.model")); // Import model Group và giao diện IGroup
class GroupService {
    // Phương thức tạo nhóm mới
    createGroup(groupName, members) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = new Group_model_1.default({
                group_name: groupName, // Tên nhóm
                group_members: members, // Số thành viên
                group_createAt: new Date(), // Ngày tạo nhóm
                group_updateAt: new Date(), // Ngày cập nhật nhóm lần cuối
            });
            return group.save(); // Lưu nhóm vào cơ sở dữ liệu và trả về kết quả
        });
    }
    // Phương thức thêm thành viên vào nhóm
    addMember(groupId, memberCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield Group_model_1.default.findById(groupId).exec(); // Tìm nhóm theo ID và ép kiểu sang IGroup
            if (!group) {
                throw new Error('Group not found'); // Nếu không tìm thấy nhóm, ném ra lỗi
            }
            group.group_members += memberCount; // Cộng số thành viên mới vào tổng số thành viên
            group.group_updateAt = new Date(); // Cập nhật ngày cập nhật nhóm
            return group.save(); // Lưu thay đổi vào cơ sở dữ liệu và trả về kết quả
        });
    }
}
exports.default = new GroupService();
