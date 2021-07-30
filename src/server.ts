import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import  { router } from "./routes";

import "./database";

// @types/express
const app  = express();
/**
 * GET => Buscar uma informação
 * POST => Inserir/Criar uma informação
 * PUT => Alterar uma informação
 * DELETE => Remover um dado
 * PATCH => Alterar uma informação específica
 */

/**
 * Tipos de parametros
 * Routes Params => http://localhost:3000/produtos/2383287323
 * Query Params => http://localhost:3000/produtos?name=teclado&description=tecladobom
 * 
 * Body Params => {
 *  "name": "teclado",
 *  "description": "teclado bom"
 * }
 * 
 */
// app.get("/test", (req, res) => {
//     // Request => Entrando
//     // Response => Saindo
//     return res.send("Olá NLW")
// })

// app.post("/test-post", (req, res) => {
//     return res.send("Ola NLW Método Post")
// })

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

//http://localhost:3000
app.listen(3000, () => {console.log("Server is running")})