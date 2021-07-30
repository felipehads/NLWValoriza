import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}


export function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {

    // Receber o token
    const authToken = req.headers.authorization;
    
    // Validar se token está preenchido
    if(!authToken) {
        return res.status(401).end();
    }

    // Validar o token
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token ,"57e23ff9fa5303d84f9d5ed240041d55") as IPayload;

        req.user_id = sub;

        return next()
    } catch (err) {
        return res.status(401).end()
    }
    
    // Recuperar informações do usuário
    
    
}