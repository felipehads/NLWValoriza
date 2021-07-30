import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
      const usersRepositories = getCustomRepository(UsersRepositories);
        
        //Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect")
        }
        
        //Verificar se senha está correta
        
        // 123456 / 798u89y31-adojaj9sjid
        const passwordMatch = await compare(password, user.password)
        
        if(!passwordMatch) {  
            throw new Error("Email/Password incorrect")
        }

        //Gerar token
        const token = sign({
            email: user.email
        }, "57e23ff9fa5303d84f9d5ed240041d55", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }