class UserService {
    // Kiểm tra quyền của người dùng
    public static hasPermission(user: any, requiredRole: string): boolean {
      const rolesHierarchy = ['user', 'admin', "root"]; // Danh sách các vai trò theo thứ tự quyền hạn tăng dần
      const userRoleIndex = rolesHierarchy.indexOf(user.user_role);
      const requiredRoleIndex = rolesHierarchy.indexOf(requiredRole);
      return userRoleIndex >= requiredRoleIndex;
    }
  }

  export default UserService
  