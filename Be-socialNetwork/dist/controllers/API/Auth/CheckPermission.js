"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    // Kiểm tra quyền của người dùng
    static hasPermission(user, requiredRole) {
        const rolesHierarchy = ['user', 'admin', "root"]; // Danh sách các vai trò theo thứ tự quyền hạn tăng dần
        const userRoleIndex = rolesHierarchy.indexOf(user.user_role);
        const requiredRoleIndex = rolesHierarchy.indexOf(requiredRole);
        return userRoleIndex >= requiredRoleIndex;
    }
}
exports.default = UserService;
