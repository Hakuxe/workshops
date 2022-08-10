/**1 - intalar typescript npm i / yarn add
 * 2 - tsc --init criar o arquivo tsconfig
 * 3 - ts-node-dev transformar o ts em js
 * 4 - criar script "dev":"ts-node-dev < nome arquivo.ts >"
 *
 * @types/<nome da lib>
 */

import express from "express";
import { router } from "./routes";

import { databaseConnection } from "./database/connection";


const app = express();

app.use(express.json())
app.use(router);

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
