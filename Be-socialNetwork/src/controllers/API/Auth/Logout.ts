import { Request, Response } from "express";

class Logout {
    public static async logout(req: Request, res: Response) {
        res.clearCookie("refreshToken");
        return res.status(200).json({
            message: "Logout successfully",
        });
    }
}
export default Logout