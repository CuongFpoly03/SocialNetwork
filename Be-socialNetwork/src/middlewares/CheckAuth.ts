import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Locals from "../providers/Local";
import User from "../models/User.model";

// Thêm kiểu cho req.user
declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}

class AuthenticateAndAuthorize {
    // Xác thực người dùng
    public static async Authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            // Lấy token từ request header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const token = authHeader.split(' ')[1];
            const decoded: any = jwt.verify(token, Locals.config().jwt_Secret as string);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "Invalid token!" });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }

    // Phân quyền người dùng
    public static authorize(requiredRole: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user) {
                return res.status(403).json({ message: 'Access denied' });
            }
            const rolesHierarchy = ['user','admin', "root"];
            const userRoleIndex = rolesHierarchy.indexOf(user.user_role);
            const requiredRoleIndex = rolesHierarchy.indexOf(requiredRole);

            if (userRoleIndex < requiredRoleIndex) {
                return res.status(403).json({ message: 'You do not have permission to access this resource' });
            }
            next();
        };
    }
}

export default AuthenticateAndAuthorize;
