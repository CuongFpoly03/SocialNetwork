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
const Group_service_1 = __importDefault(require("../../services/Group.service"));
const success_response_1 = require("../../cores/success.response");
class GroupController {
    // Phương thức tạo nhóm mới
    createGroup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { group_name, group_members } = req.body;
                // Kiểm tra xem các trường group_name và group_members có tồn tại không
                if (!group_name || !group_members) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                // Gọi phương thức createGroup từ GroupService để tạo nhóm mới
                const group = yield Group_service_1.default.createGroup(group_name, group_members);
                // Trả về phản hồi thành công với thông điệp "Tạo nhóm thành công" và dữ liệu nhóm đã được tạo
                return new success_response_1.SuccessResponse({
                    message: "Tạo nhóm thành công",
                    metadata: group,
                }).send(res);
            }
            catch (error) {
                // Xử lý lỗi nếu có
                return res.status(500).json({ message: "Error creating group", error });
            }
        });
    }
    // Phương thức thêm thành viên vào nhóm
    addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId, memberCount } = req.body;
                // Kiểm tra xem các trường groupId và memberCount có tồn tại không
                if (!groupId || !memberCount) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                // Gọi phương thức addMember từ GroupService để thêm thành viên vào nhóm
                const group = yield Group_service_1.default.addMember(groupId, memberCount);
                // Trả về phản hồi thành công với thông điệp "Thêm thành viên vào nhóm thành công" và dữ liệu nhóm đã được cập nhật
                return new success_response_1.SuccessResponse({
                    message: "Thêm thành viên vào nhóm thành công",
                    metadata: group,
                }).send(res);
            }
            catch (error) {
                // Xử lý lỗi nếu có
                return res
                    .status(500)
                    .json({ message: "Error adding member to group", error });
            }
        });
    }
}
exports.default = new GroupController();
