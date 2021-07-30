import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticaUserController {
    
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authenticeUserService = new AuthenticateUserService();

        const token = await authenticeUserService.execute({
            email, 
            password
        });

        return res.json(token);
    }
}

export { AuthenticaUserController }