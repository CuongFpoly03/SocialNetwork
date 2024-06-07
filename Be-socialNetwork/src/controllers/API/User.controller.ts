import { Request, Response } from "express";
import { SuccessResponse } from "../../cores/success.response";
import UserService from "../../services/User.service";

class UserController {
    public static async creatUserGoogle(req: Request, res: Response) : Promise<any> {
        return new SuccessResponse({
            message: 'create user successfully',
            metadata: await UserService.createUserGoogle(req.body)
        }).send(res)
    }   

    public static async getAll(req: Request | any, res: Response){
        return new SuccessResponse({
            message: 'get all user successfully',
            metadata: await UserService.getAll(req.query)
        }).send(res)
    }

    public static async getOneUser(req: Request, res: Response) {
        return new SuccessResponse({
            message: "get One User successfully !",
            metadata: await UserService.getUserById({id: req.params.id})
        }).send(res)
    }
}

export default UserController;