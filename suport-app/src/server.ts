/**1 - intalar typescript npm i / yarn add
 * 2 - tsc --init criar o arquivo tsconfig
 * 3 - ts-node-dev transformar o ts em js
 * 4 - criar script "dev":"ts-node-dev < nome arquivo.ts >"
 *
 * @types/<nome da lib>
 */

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";
import { databaseConnection } from "./database/connection";

const app = express();

app.use(express.json());
app.use(router);

// middleware -> Um interceptador da requisição tipo um porteiro
// pode ser feito no próprio use ou num arquivo separado e passado na rota
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof Error) {
			//throw new cai aki
			return response.status(400).json({ 
            error: err.message, 
         });
		}

		return response.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
);

databaseConnection(); // database

app.listen("3030", () => console.log("Rodando porta 3030....."));

/**
 * Tipos de parâmetros
 * Routes Params => parametros passados na rota http://localhost:3000/livro/2  /livros/{id}
 * Query Params => filtros da rota http://localhost:3000/livro?name="culpa"&autor="livro+bom"
 *
 * Body Params => dados passados dentro da requisição {
 *    "name":"livro",
 *    "autor":"um autor"
 * }
 */
