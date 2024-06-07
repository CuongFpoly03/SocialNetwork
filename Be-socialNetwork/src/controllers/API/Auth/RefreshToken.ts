import jwt from "jsonwebtoken";
import Locals from "../../../providers/Local";
import { IAuthUser, IUser } from "../../../interfaces/Models/IUser";
import { Request, Response } from "express";
import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
class refreshToken {
    public static generateRefreshToken(user: IAuthUser) {
        const refreshToken = Locals.config().jwtRefreshKey;
        if(!refreshToken) {
            throw new Error("No token provided");
        }
        return jwt.sign(
            {
                id: user.id,
                user_role: user.user_role
            },
            refreshToken,
            {
                expiresIn: "365d"
            }
        );
    }

    public static async requestRefreshToken(req: Request, res: Response) {
        // refresh token from user
        const refreshToken = req.body.refreshToken;
        if(!refreshToken) {
            return res.status(401).json({ error: "No refresh token provided" });
        }
        jwt.verify(refreshToken, Locals.config().jwtRefreshKey, (err: any, user: any) => {
            if(err) {
                return res.status(403).json({ error: "Invalid refresh token" });
            }
            const accessToken = AccessToken.generateAccessToken(user);
            const refreshToken = RefreshToken.generateRefreshToken(user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: "strict",
            })

            // return access token
            return res.status(200).json({message: "successfully !",
                accessToken
            });
        });
    }
}

export default refreshToken;